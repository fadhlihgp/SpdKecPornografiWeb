using HotChocolate.AspNetCore.Authorization;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.GraphQL.Queries;

[ExtendObjectType("Query")]
[Authorize]
public class AnswerQuery
{
    private readonly IAnswerService _answerService;

    public AnswerQuery(IAnswerService answerService)
    {
        _answerService = answerService;
    }
    
    public async Task<AnswerResponseDto> GetAnswerById(string id)
    {
        return await _answerService.FindAnswerById(id);
    }
    
    public async Task<IEnumerable<AnswerResponseDto>> GetAnswerList(string? answerName = "")
    {
        return await _answerService.FindAnswers(answerName);
    }
    
    public async Task<IEnumerable<AnswerResponseDto>> GetAnswersByQuestionId(string questionId)
    {
        return await _answerService.FindAnswersByQuestionId(questionId);
    }
}