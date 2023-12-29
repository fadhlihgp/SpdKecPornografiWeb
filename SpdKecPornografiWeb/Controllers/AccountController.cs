using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Controllers;

[ApiController]
[Route("api/account")]
public class AccountController : ControllerBase
{
    private readonly IAccountService _accountService;

    public AccountController(IAccountService accountService)
    {
        _accountService = accountService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterAccount([FromBody] RegisterRequestDto registerRequestDto)
    {
        var result = await _accountService.Register(registerRequestDto);
        return Created("account/register", new
        {
            message = "Berhasil membuat akun, silahkan login",
            data = result
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequestDto)
    {
        var result = await _accountService.Login(loginRequestDto);
        return Ok(new
        {
            message = "Berhasil login",
            data = result
        });
    }

    [Authorize]
    [HttpGet("currentUser")]
    public async Task<IActionResult> CurrentUser()
    {
        var accountId = User.FindFirst("AccountId")?.Value;
        var currentUser = await _accountService.CurrentAccount(accountId);
        return Ok(new
        {
            message = "Berhasil mengambil data user",
            data = currentUser
        });
    }
    
}