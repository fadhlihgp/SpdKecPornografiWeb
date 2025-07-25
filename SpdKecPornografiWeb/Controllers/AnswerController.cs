﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Controllers;

[ApiController]
[Authorize]
[Route("api/answer")]
public class AnswerController : ControllerBase
{
    private readonly IAnswerService _answerService;

    public AnswerController(IAnswerService answerService)
    {
        _answerService = answerService;
    }

    [HttpPost]
    public async Task<IActionResult> AddAnswer([FromBody] AnswerRequestDto answerRequestDto)
    {
        var accountId = User.FindFirst("AccountId")?.Value;
        await _answerService.AddAnswerAsync(accountId, answerRequestDto);
        return Created("api/answer", new
        {
            message = "Berhasil membuat data jawaban"
        });
    }

    [HttpGet]
    public async Task<IActionResult> FindAnswers([FromQuery] string? answerName)
    {
        var answerResponseDtos = await _answerService.FindAnswers(answerName);
        return Ok(new
        {
            message = "Berhasil mendapatkan data jawaban",
            data = answerResponseDtos
        });
    }

    [HttpGet("{answerId}")]
    public async Task<IActionResult> FindAnswerById([FromRoute] string answerId)
    {
        var answer = await _answerService.FindAnswerById(answerId);
        return Ok(new
        {
            message = "Berhasil mendapatkan data jawaban",
            data = answer
        });
    }

    [HttpGet("questionId/{questionId}")]
    public async Task<IActionResult> FindAnswerByQuestionId([FromRoute] string questionId)
    {
        var answers = await _answerService.FindAnswersByQuestionId(questionId);
        return Ok(new
        {
            message = "Berhasil mendapatkan data jawaban",
            data = answers
        });
    }
    
    [HttpPut("{answerId}")]
    public async Task<IActionResult> UpdateAnswer([FromRoute] string answerId,
        [FromBody] AnswerRequestDto answerRequestDto)
    {
        var accountId = User.FindFirst("AccountId")?.Value;
        await _answerService.UpdateAnswerAsync(accountId, answerId, answerRequestDto);
        return Ok(new
        {
            message = "Berhasil memperbarui data jawaban"
        });
    }

    [HttpGet("generateCode")]
    public Task<IActionResult> GenerateCode()
    {
        return Task.FromResult<IActionResult>(Ok(new
        {
            message = "Berhasil mendapatakan kode jawaban",
            data = _answerService.GenerateAnswerCode()
        }));
    }
    
    [HttpDelete("{answerId}")]
    public async Task<IActionResult> DeleteAnswer([FromRoute] string answerId)
    {
        await _answerService.DeleteAnswer(answerId);
        return Ok(new
        {
            message = "Berhasil menghapus data jawaban"
        });
    }
}