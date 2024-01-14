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

    [Authorize]
    [HttpGet("list")]
    public async Task<IActionResult> FindAccounts([FromQuery] string? accountName)
    {
        var accounts = await _accountService.FindAccounts(accountName);
        return Ok(new
        {
            message = "Berhasil mendapatkan data akun",
            data = accounts
        });
    }

    [HttpPost("resetPassword")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordOtpDto resetPasswordOtpDto)
    {
        await _accountService.ResetPassword(resetPasswordOtpDto);
        return Ok(new
        {
            message = "Password berhasil di reset, password baru telah dikirim ke email anda"
        });
    }

    [Authorize]
    [HttpPost("changePassword")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto change)
    {
        var accountId = User.FindFirst("AccountId")?.Value;
        await _accountService.ChangePassword(accountId, change);
        return Ok(new
        {
            message = "Berhasil memperbarui password"
        });
    }

    [Authorize]
    [HttpPost("changePasswordAdmin/{accountId}")]
    public async Task<IActionResult> ChangePasswordAdmin([FromRoute] string accountId, [FromBody] ChangePasswordAdminDto change)
    {
        // var accountId = User.FindFirst("AccountId")?.Value;
        await _accountService.ChangePasswordAdmin(accountId, change);
        return Ok(new
        {
            message = "Berhasil memperbarui password"
        });
    }
    
    [Authorize]
    [HttpGet("{accountId}")]
    public async Task<IActionResult> FindAccountById([FromRoute] string accountId)
    {
        var account = await _accountService.FindAccountById(accountId);
        return Ok(new
        {
            message = "Berhasil mendapatkan data akun",
            data = account
        });
    }

    [Authorize]
    [HttpPut("{accountId}")]
    public async Task<IActionResult> UpdateAccount([FromRoute] string accountId, [FromBody] UpdateAccountRequestDto registerRequestDto)
    {
        await _accountService.EditAccountById(accountId, registerRequestDto);
        return Ok(new
        {
            message = "Berhasil memperbarui data akun"
        });
    }

    [Authorize]
    [HttpPut("changePhoto")]
    public async Task<IActionResult> ChangePhoto([FromForm] IFormFile imageFile)
    {
        var accountId = User.FindFirst("AccountId")?.Value;
        await _accountService.ChangePhotoAccount(accountId, imageFile);
        return Ok(new
        {
            message = "Berhasil memperbarui photo"
        });
    }
}