using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Controllers;

[ApiController]
[Route("api/answerDiagnosis")]
[Authorize]
public class AnswerDiagnosisController : ControllerBase
{
    private readonly IAnswerDiagnosisService _answerDiagnosisService;

    public AnswerDiagnosisController(IAnswerDiagnosisService answerDiagnosisService)
    {
        _answerDiagnosisService = answerDiagnosisService;
    }

    [HttpPost]
    public async Task<IActionResult> AddAnswerDiagnosis([FromBody] AnswerDiagnosisRequestDto requestDto)
    {
        var accountId = User.FindFirst("AccountId")?.Value;
        await _answerDiagnosisService.AddAnswerDiagnosisAsync(accountId, requestDto);
        return Created("api/answerDiagnosis", new
        {
            message = "Berhasil menambah data relasi",
        });
    }
    
    [HttpGet]
    public async Task<IActionResult> FindAnswerDiagnosis([FromQuery] string? code)
    {
        var result = await _answerDiagnosisService.FindAllAnswerDiagnosisAsync(code);
        return Ok(new
        {
            message = "Berhasil mendapatkan data relasi",
            data = result
        });
    }

    [HttpGet("{answerDiagnosisId}")]
    public async Task<IActionResult> FindAnswerDiagnosisById([FromRoute] string answerDiagnosisId)
    {
        var result = await _answerDiagnosisService.FindAnswerDiagnosisById(answerDiagnosisId);
        return Ok(new
        {
            message = "Berhasil mendapatkan data relasi",
            data = result
        });
    }

    [HttpPut("{answerDiagnosisId}")]
    public async Task<IActionResult> UpdateAnswerDiagnosis([FromRoute] string answerDiagnosisId,
        [FromBody] AnswerDiagnosisRequestDto answerDiagnosisRequestDto)
    {
        var accountId = User.FindFirst("AccountId")?.Value;
        await _answerDiagnosisService.UpdateAnswerDiagnosisAsync(accountId, answerDiagnosisId,
            answerDiagnosisRequestDto);
        return Ok(new
        {
            message = "Berhasil memperbarui data relasi",
        });
    }

    [HttpDelete("{answerDiagnosisId}")]
    public async Task<IActionResult> DeleteAnswerDiagnosis([FromRoute] string answerDiagnosisId)
    {
        await _answerDiagnosisService.DeleteAnswerDiagnosisById(answerDiagnosisId);
        return Ok(new
        {
            message = "Berhasil menghapus data relasi"
        });
    }
}