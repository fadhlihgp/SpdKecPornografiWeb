using Microsoft.AspNetCore.Mvc;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Controllers;

[ApiController]
[Route("api/email")]
public class SendEmailController : ControllerBase
{
    private readonly IEmailService _emailService;

    public SendEmailController(IEmailService emailService)
    {
        _emailService = emailService;
    }

    [HttpPost]
    public async Task<IActionResult> SendEmailAsync([FromBody] SendEmailDto sendEmailDto)
    {
        await _emailService.SendEmailAsync(sendEmailDto);
        return Ok(new
        {
            message = "Email berhasil dikirim",
        });
    }
}