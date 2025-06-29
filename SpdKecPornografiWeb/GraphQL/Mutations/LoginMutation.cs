using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.GraphQL.Mutations;

public class LoginMutation
{
    private readonly IAccountService _accountService;

    public LoginMutation(IAccountService accountService)
    {
        _accountService = accountService;
    }

    public async Task<LoginResponseDto> Login(LoginRequestDto requestDto)
    {
        return await _accountService.Login(requestDto);
    }
}