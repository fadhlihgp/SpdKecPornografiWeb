using SpdKecPornografiWeb.Exceptions;
using SpdKecPornografiWeb.Helpers;
using SpdKecPornografiWeb.Models;
using SpdKecPornografiWeb.Repositories.Interfaces;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Services;

public class OtpService : IOtpService
{
    private readonly IRepository<Otp> _repository;
    private readonly IPersistence _persistence;
    private readonly IEmailService _emailService;
    private readonly IRepository<Account> _accountRepository;

    public OtpService(IRepository<Otp> repository, IPersistence persistence, IEmailService emailService, IRepository<Account> accountRepository)
    {
        _repository = repository;
        _persistence = persistence;
        _emailService = emailService;
        _accountRepository = accountRepository;
    }

    public async Task CreateOtpAsync(Otp otp)
    {
        await _repository.Save(otp);
        await _persistence.SaveChangesAsync();
    }

    public async Task UpdateOtpAsync(Otp otp)
    {
        throw new NotImplementedException();
    }

    public async Task DeleteOtpAsync(string otpId)
    {
        var findOtp = await FindOtpById(otpId);
        _repository.Delete(findOtp);
        await _persistence.SaveChangesAsync();
    }

    public async Task<Otp> GetOtpByEmail(string email, string otpCode)
    {
        var otpFind = await _repository.Find(otp => otp.Email.ToLower().Equals(email.ToLower())
                                                    && !otp.IsVerified && otp.OtpCode.Equals(otpCode));
        if (otpFind == null) throw new BadRequestException("Kode Otp tidak sesuai");
        if (otpFind.ExpiredAt < DateTime.Now) throw new BadRequestException("Otp anda telah expired");
        return otpFind;

    }

    public async Task<Otp> FindOtpById(string otpId)
    {
        var findOtp = await _repository.FindById(otpId);
        if (findOtp == null) throw new NotFoundException("Kode Otp tidak valid");
        return findOtp;
    }

    public async Task SendOtpAsync(string email, string subject)
    {
        string randomOtp = RandomCode.GenerateOtpRandom();
        
        var otpFindEmail = await _repository.Find(otp => otp.Email.ToLower().Equals(email.ToLower()));
        if (otpFindEmail != null)
        {
            otpFindEmail.OtpCode = randomOtp;
            otpFindEmail.ExpiredAt = DateTime.Now.AddMinutes(10);
        }
        
        var saveOtp = new Otp
        {
            Email = email,
            OtpCode = randomOtp,
            ExpiredAt = DateTime.Now.AddMinutes(10),
        };

        SendEmailDto sendEmailDto = new SendEmailDto
        {
            To = email,
            Subject = subject,
            Body = $"<p>Kode OTP anda: <strong>{randomOtp}</strong></p> <p> Kode otp berlaku dalam 10 menit, Mohon tidak memberikan Kode OTP anda kepada siapapun.</p>"
        };

        var account = await _accountRepository.Find(acc => acc.Email.ToLower().Equals(email.ToLower()));
        if (account == null) throw new NotFoundException("Email tidak terdaftar!");
        await _persistence.ExecuteTransaction(async () =>
        {
            var save = otpFindEmail == null ? await _repository.Save(saveOtp) : 
                    _repository.Update(otpFindEmail);
            await _emailService.SendEmailAsync(sendEmailDto);
            return save;
        });

    }
}