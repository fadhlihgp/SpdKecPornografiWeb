using Microsoft.AspNetCore.Mvc;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Controllers;

[ApiController]
[Route("api/otp")]
public class OtpController : ControllerBase
{
    private readonly IOtpService _otpService;

    public OtpController(IOtpService otpService)
    {
        _otpService = otpService;
    }

    [HttpPost("sendConfirmPassword")]
    public async Task<IActionResult> SendOtp([FromBody] SendOtpDto sendOtpDto)
    {
        string subject = "[SPD Kecanduan Pornografi] Kode Konfirmasi Reset Password";
        await _otpService.SendOtpAsync(sendOtpDto.Email, subject);
        return Ok(new
        {
            message = "Kode otp berhasil terkirim ke email anda"
        });
    }
}