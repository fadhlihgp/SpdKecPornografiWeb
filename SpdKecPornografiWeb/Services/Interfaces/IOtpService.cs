using SpdKecPornografiWeb.Models;

namespace SpdKecPornografiWeb.Services.Interfaces;

public interface IOtpService
{
    public Task CreateOtpAsync(Otp otp);
    public Task UpdateOtpAsync(Otp otp);
    public Task DeleteOtpAsync(string otpId);
    public Task<Otp> GetOtpByEmail(string email, string otpCode);
    public Task<Otp> FindOtpById(string otpId);
    public Task SendOtpAsync(string email, string subject);
}