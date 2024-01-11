using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Services.Interfaces;

public interface IEmailService
{
    public Task<bool> SendEmailAsync(SendEmailDto sendEmailDto);
}