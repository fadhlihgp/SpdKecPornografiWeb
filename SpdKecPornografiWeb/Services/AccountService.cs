using SpdKecPornografiWeb.Context;
using SpdKecPornografiWeb.Exceptions;
using SpdKecPornografiWeb.Helpers;
using SpdKecPornografiWeb.Models;
using SpdKecPornografiWeb.Repositories.Interfaces;
using SpdKecPornografiWeb.Security;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Services;

public class AccountService : IAccountService
{
    private readonly IRepository<Account> _accountRepository;
    private readonly IOtpService _otpService;
    private readonly IEmailService _emailService;
    private readonly IPersistence _persistence;
    private readonly IJwtUtil _jwtUtil;
    private readonly IPhotoService _photoService;

    public AccountService(IRepository<Account> accountRepository, IPersistence persistence, IJwtUtil jwtUtil, IOtpService otpService, IEmailService emailService, IPhotoService photoService)
    {
        _accountRepository = accountRepository;
        _persistence = persistence;
        _jwtUtil = jwtUtil;
        _otpService = otpService;
        _emailService = emailService;
        _photoService = photoService;
    }

    public async Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto)
    {
        // Validasi login
        var findAccount = await _accountRepository.Find(a =>
            a.Email.Equals(loginRequestDto.Email) || a.Username.Equals(loginRequestDto.Email), new []{ "Role" });
        if (findAccount == null) throw new UnauthorizedException("Email atau Password salah");

        var isValid = BCrypt.Net.BCrypt.Verify(loginRequestDto.Password, findAccount.Password);
        if (!isValid) throw new UnauthorizedException("Email atau Password Salah");

        if (findAccount.IsBlocked || !findAccount.IsActive)
            throw new UnauthorizedException("Maaf, akun ada terblokir atau sudah tidak aktif. Silahkan hubungi admin jika butuh bantuan");

        var jwtToken = _jwtUtil.GenerateToken(findAccount);

        var loginResponse = await _persistence.ExecuteTransaction(async () =>
        {
            findAccount.LastLogin = DateTime.Now;
            _accountRepository.Update(findAccount);

            return new LoginResponseDto
            {
                Username = findAccount.Username,
                Role = findAccount.Role.Name,
                Token = jwtToken
            };
        });
        return loginResponse;
    }

    public async Task<RegisterResponseDto> Register(RegisterRequestDto registerRequestDto)
    {
        await RegisterAccountValidation(registerRequestDto);

        var registerResponse = await _persistence.ExecuteTransaction(async () =>
        {
            var saveAccount = new Account
            {
                Fullname = registerRequestDto.Fullname,
                Username = registerRequestDto.Username,
                Password = BCrypt.Net.BCrypt.HashPassword(registerRequestDto.Password),
                Email = registerRequestDto.Email,
                PhoneNumber = registerRequestDto.PhoneNumber,
                ImageUrl = registerRequestDto.ImageUrl,
                RoleId = registerRequestDto.RoleId,
                CreatedAt = DateTime.Now,
                IsActive = registerRequestDto.IsActive == null || registerRequestDto.IsActive == "true",
                IsBlocked = registerRequestDto.IsBlocked != null && registerRequestDto.IsBlocked == "true"
            };
            return await _accountRepository.Save(saveAccount);
        });
        return new RegisterResponseDto
        {
            Fullname = registerResponse.Fullname,
            Username = registerResponse.Username,
            Email = registerResponse.Email
        };
    }

    public async Task<AccountDto?> CurrentAccount(string accountId)
    {
        var findAccount = await _accountRepository.Find(a => a.Id.Equals(accountId), new []{ "Role" });
        var result = new AccountDto();
        if (findAccount != null)
        {
            result.Id = findAccount.Id;
            result.Email = findAccount.Email;
            result.Fullname = findAccount.Fullname;
            result.Username = findAccount.Username;
            result.ImageUrl = findAccount.ImageUrl;
            result.LastLogin = findAccount.LastLogin;
            result.PhoneNumber = findAccount.PhoneNumber;
            result.CreatedAt = findAccount.CreatedAt;
            result.Role = findAccount.Role?.Name;
            result.RoleId = findAccount.RoleId;
        }

        return result;
    }

    public async Task<IEnumerable<AccountDto>> FindAccounts(string? name = "")
    {
        var accounts = name != null
            ? await _accountRepository.FindAll(a => a.Fullname.ToLower().Contains(name.ToLower()), new[] { "Role" })
            : await _accountRepository.FindAll( new[] { "Role" });
        return accounts.Select(account => new AccountDto
        {
            Id = account.Id,
            Fullname = account.Fullname,
            Username = account.Username,
            Email = account.Email,
            PhoneNumber = account.PhoneNumber,
            ImageUrl = account.ImageUrl,
            Role = account.Role?.Name,
            RoleId = account.RoleId,
            CreatedAt = account.CreatedAt,
            LastLogin = account.LastLogin,
            IsActive = account.IsActive,
            IsBlocked = account.IsBlocked,
            IsVerified = account.IsVerified
        });
    }

    public async Task ResetPassword(ResetPasswordOtpDto resetPasswordOtpDto)
    {
        var findOtp = await _otpService.GetOtpByEmail(resetPasswordOtpDto.Email, resetPasswordOtpDto.OtpCode);
        var findAccount = await FindAccountByEmail(resetPasswordOtpDto.Email);
        string passwordRandom = RandomCode.GeneratePasswordRandom();
        await _persistence.ExecuteTransaction(async () =>
        {
            findAccount.Password = BCrypt.Net.BCrypt.HashPassword(passwordRandom);
            _accountRepository.Update(findAccount);
            await _emailService.SendEmailAsync(new SendEmailDto
            {
                To = resetPasswordOtpDto.Email,
                Subject = "[SPD Kecanduan Pornografi] New Reset Password ",
                Body = $"<p>Password anda: <strong>{passwordRandom}</strong></p> Gunakan password tersebut untuk login, dan anda bisa mengganti password setelahnya."
            });
            await _otpService.DeleteOtpAsync(findOtp.Id);
            return true;
        });
    }

    public async Task<Account> FindAccountByEmail(string email)
    {
        var findAccount = await _accountRepository.Find(acc =>
            acc.Email.ToLower().Equals(email.ToLower()));
        if (findAccount == null) throw new NotFoundException("Email tidak terdaftar!");
        return findAccount;
    }

    public async Task ChangePassword(string accountId , ChangePasswordDto changePasswordDto)
    {
        var findAccountById = await _accountRepository.FindById(accountId);
        bool isVerify = BCrypt.Net.BCrypt.Verify(changePasswordDto.OldPassword, findAccountById.Password);
        if (!isVerify) throw new ForbiddenException("Password lama tidak sesuai");
        findAccountById.Password = BCrypt.Net.BCrypt.HashPassword(changePasswordDto.NewPassword);
        _accountRepository.Update(findAccountById);
        await _persistence.SaveChangesAsync();
    }

    public async Task ChangePasswordAdmin(string accountId, ChangePasswordAdminDto changePasswordAdminDto)
    {
        var findAccountById = await _accountRepository.FindById(accountId);
        if (findAccountById == null) throw new NotFoundException("Akun tidak ditemukan");
        findAccountById.Password = BCrypt.Net.BCrypt.HashPassword(changePasswordAdminDto.NewPassword);
        _accountRepository.Update(findAccountById);
        await _persistence.SaveChangesAsync();
    }

    public async Task<AccountDto> FindAccountById(string accountId)
    {
        var findAccountId = await _accountRepository.Find(acc => acc.Id.Equals(accountId), new []{ "Role" });
        if (findAccountId == null) throw new NotFoundException("Akun tidak ditemukan");
        return new AccountDto
        {
            Id = findAccountId.Id,
            Fullname = findAccountId.Fullname,
            Username = findAccountId.Username,
            Email = findAccountId.Email,
            PhoneNumber = findAccountId.PhoneNumber,
            ImageUrl = findAccountId.ImageUrl,
            Role = findAccountId.Role?.Name,
            RoleId = findAccountId.RoleId,
            IsActive = findAccountId.IsActive,
            IsBlocked = findAccountId.IsBlocked,
            IsVerified = findAccountId.IsVerified,
            CreatedAt = findAccountId.CreatedAt,
            LastLogin = findAccountId.LastLogin
        };
    }

    public async Task EditAccountById(string accountId, UpdateAccountRequestDto updateAccountRequestDto)
    {
        await EditAccountValidation(accountId,updateAccountRequestDto);
        var findAccount = await _accountRepository.Find(acc => acc.Id.Equals(accountId));
        if (findAccount == null) throw new NotFoundException("Akun tidak ditemukan");
        findAccount.Fullname = updateAccountRequestDto.Fullname;
        findAccount.Username = updateAccountRequestDto.Username;
        findAccount.Email = updateAccountRequestDto.Email;
        findAccount.PhoneNumber = updateAccountRequestDto.PhoneNumber;

        await _persistence.ExecuteTransaction(() => Task.FromResult(_accountRepository.Update(findAccount)));
    }

    public async Task ChangePhotoAccount(string accountId, IFormFile fileImage)
    {
        var findAccountId = await _accountRepository.FindById(accountId);
        if (findAccountId == null) throw new NotFoundException("Akun tidak ditemukan");
        await _persistence.ExecuteTransaction(async () =>
        {
            if (findAccountId.ImageUrl != null)
            {
                string publicKey = RandomCode.ConvertUrlToPublicId(findAccountId.ImageUrl);
                await _photoService.DeletePhotoAsync(publicKey);
            }

            var uploadPhoto = await _photoService.AddPhotoAsync(fileImage);
            findAccountId.ImageUrl = uploadPhoto.Url.ToString();
            return _accountRepository.Update(findAccountId);
        });
    }

    public int CountAccounts()
    {
        return _accountRepository.Count();
    }

    private async Task RegisterAccountValidation(RegisterRequestDto registerRequestDto1)
    {
        var findEmail = await _accountRepository.Find(a => a.Email.Equals(registerRequestDto1.Email));
        if (findEmail != null) throw new UnauthorizedException("Email sudah terdaftar!");

        var findUsername = await _accountRepository.Find(a => a.Username.Equals(registerRequestDto1.Username));
        if (findUsername != null) throw new UnauthorizedException("Username sudah terdaftar!");

        var findPhone = await _accountRepository.Find(a => a.PhoneNumber.Equals(registerRequestDto1.PhoneNumber));
        if (findPhone != null) throw new UnauthorizedException("Nomor ponsel sudah terdaftar!");
    }
    
    private async Task EditAccountValidation(string accountId, UpdateAccountRequestDto registerRequestDto1)
    {
        var findEmail = await _accountRepository.Find(a => a.Email.Equals(registerRequestDto1.Email) && !a.Id.Equals(accountId));
        if (findEmail != null) throw new UnauthorizedException("Email sudah digunakan akun lain!");

        var findUsername = await _accountRepository.Find(a => a.Username.Equals(registerRequestDto1.Username) && !a.Id.Equals(accountId));
        if (findUsername != null) throw new UnauthorizedException("Username sudah digunakan akun lain!");

        var findPhone = await _accountRepository.Find(a => a.PhoneNumber.Equals(registerRequestDto1.PhoneNumber) && !a.Id.Equals(accountId));
        if (findPhone != null) throw new UnauthorizedException("Nomor ponsel sudah digunakan akun lain!");
    }
    
}