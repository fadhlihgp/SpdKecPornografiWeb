using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Controllers;

[ApiController]
[Route("api/diagnosis")]
[Authorize]
public class DiagnosisController : ControllerBase
{
    private readonly IDiagnosisService _diagnosisService;

    public DiagnosisController(IDiagnosisService diagnosisService)
    {
        _diagnosisService = diagnosisService;
    }

    [HttpPost]
    public async Task<IActionResult> AddDiagnosis([FromBody] DiagnosisRequestDto diagnosisRequestDto)
    {
        var accountId = User.FindFirst("AccountId")?.Value;
        await _diagnosisService.AddDiagnosisAsync(accountId, diagnosisRequestDto);
        return Created("/api/diagnosis", new
        {
            message = "Berhasil membuat data diagnosa"
        });
    }

    [HttpGet]
    public async Task<IActionResult> FindDiagnosis([FromQuery] string? name)
    {
        return Ok(new
        {
            message = "Berhasil mendapatkan data diagnosa",
            data = await _diagnosisService.FindDiagnosis(name)
        });
    }

    [HttpGet("{diagnosisId}")]
    public async Task<IActionResult> FindDiagnosisById([FromRoute] string diagnosisId)
    {
        return Ok(new
        {
            message = "Berhasil mendapatkan data diagnosa",
            data = await _diagnosisService.FindDiagnosisById(diagnosisId)
        });
    }

    [HttpPut("{diagnosisId}")]
    public async Task<IActionResult> UpdateDiagnosis([FromRoute] string diagnosisId,
        [FromBody] DiagnosisRequestDto diagnosisRequestDto)
    {
        var accountId = User.FindFirst("AccountId")?.Value;
        await _diagnosisService.UpdateDiagnosisAsync(accountId, diagnosisId, diagnosisRequestDto);
        return Ok(new
        {
            message = "Berhasil memperbarui data diagnosa"
        });
    }

    [HttpPut("delete/{diagnosisId}")]
    public async Task<IActionResult> DeleteDiagnosis([FromRoute] string diagnosisId)
    {
        var acconuntId = User.FindFirst("AccountId")?.Value;
        await _diagnosisService.DeleteDiagnosis(acconuntId, diagnosisId);
        return Ok(new { message = "Berhasil menghapus data diagnosis" });
    }

    [HttpGet("generateCode")]
    public Task<IActionResult> GenerateCode()
    {
        return Task.FromResult<IActionResult>(Ok(new
        {
            message = "Berhasil generate code",
            data = _diagnosisService.GenerateDiagnosisCode()
        }));
    }

    [HttpGet("transactionee")]
    public async Task<IActionResult> TransactionRelation([FromBody] TrDto answerIds)
    {
        return Ok(new
        {
            message = "Berhasil mendapatkan data diagnosa",
            data = await _diagnosisService.FindDiagnosisByAnswerIds(answerIds.AnswerIds)
        });
    }
}