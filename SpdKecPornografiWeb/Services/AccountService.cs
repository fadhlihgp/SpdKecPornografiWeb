using SpdKecPornografiWeb.Context;
using SpdKecPornografiWeb.Exceptions;
using SpdKecPornografiWeb.Models;
using SpdKecPornografiWeb.Repositories.Interfaces;
using SpdKecPornografiWeb.Security;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Services;

public class AccountService : IAccountService
{
    private readonly IRepository<Account> _accountRepository;
    private readonly IPersistence _persistence;
    private readonly IJwtUtil _jwtUtil;

    public AccountService(IRepository<Account> accountRepository, IPersistence persistence, IJwtUtil jwtUtil)
    {
        _accountRepository = accountRepository;
        _persistence = persistence;
        _jwtUtil = jwtUtil;
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

    private async Task RegisterAccountValidation(RegisterRequestDto registerRequestDto1)
    {
        var findEmail = await _accountRepository.Find(a => a.Email.Equals(registerRequestDto1.Email));
        if (findEmail != null) throw new UnauthorizedException("Email sudah terdaftar!");

        var findUsername = await _accountRepository.Find(a => a.Username.Equals(registerRequestDto1.Username));
        if (findUsername != null) throw new UnauthorizedException("Username sudah terdaftar!");

        var findPhone = await _accountRepository.Find(a => a.PhoneNumber.Equals(registerRequestDto1.PhoneNumber));
        if (findPhone != null) throw new UnauthorizedException("Nomor ponsel sudah terdaftar!");
    }
    
    
}