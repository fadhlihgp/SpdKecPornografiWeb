using SpdKecPornografiWeb.Models;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Services.Interfaces;

public interface IAccountService
{
    public Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto);
    public Task<RegisterResponseDto> Register(RegisterRequestDto registerRequestDto);
    public Task<AccountDto?> CurrentAccount(string accountId);
    public Task<IEnumerable<AccountDto>> FindAccounts(string? name);
    public Task ResetPassword(ResetPasswordOtpDto resetPasswordOtpDto);
    public Task<Account> FindAccountByEmail(string email);
    public Task ChangePassword(string accountId, ChangePasswordDto changePasswordDto);
    public Task ChangePasswordAdmin(string accountId, ChangePasswordAdminDto changePasswordAdminDto);
    public Task<AccountDto> FindAccountById(string accountId);
    public Task EditAccountById(string accountId, UpdateAccountRequestDto accountDto);
    public Task ChangePhotoAccount(string accountId, IFormFile fileImage);
}