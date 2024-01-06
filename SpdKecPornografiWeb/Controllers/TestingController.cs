using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Controllers;

[ApiController]
[Authorize]
[Route("api/testing")]
public class TestingController : ControllerBase
{
    private IResultHistoryService _resultHistoryService;

    public TestingController(IResultHistoryService resultHistoryService)
    {
        _resultHistoryService = resultHistoryService;
    }

    [HttpPost]
    public async Task<IActionResult> GetResultTesting([FromBody] TestingDto testingDto)
    {
        var accountId = User.FindFirst("AccountId")?.Value;
        var result = await _resultHistoryService.AddResultHistoryAndGetDiagnosis(accountId, testingDto.AnswerIds);
        return Ok(new
        {
            message = "Diagnosa berhasil",
            data = result
        });
    }

    [HttpGet]
    public async Task<IActionResult> GetAllResultHistories([FromQuery] string? date)
    {
        var accountId = User.FindFirst("AccountId")?.Value;
        var result = await _resultHistoryService.GetAllResultHistories(accountId, date);
        return Ok(new
        {
            message = "Berhasil mendapatkan data riwayat pengujian",
            data = result
        });
    }

    [HttpGet("{resultHistoryId}")]
    public async Task<IActionResult> GetResultHistoryById([FromRoute] string resultHistoryId)
    {
        return Ok(new
        {
            message = "Berhasil mendapatkan data detail riwayat pengujian",
            data = await _resultHistoryService.GetResultHistoryById(resultHistoryId)
        });
    }
}