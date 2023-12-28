using SpdKecPornografiWeb.Models;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Services.Interfaces;

public interface IAccountService
{
    public Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto);
    public Task<RegisterResponseDto> Register(RegisterRequestDto registerRequestDto);
    public Task<AccountDto?> CurrentAccount(string accountId);
}