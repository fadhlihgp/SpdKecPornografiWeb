using HotChocolate.AspNetCore.Authorization;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.GraphQL.Queries;

[Authorize]
public class QuestionQuery
{
    private readonly IQuestionService _questionService;

    public QuestionQuery(IQuestionService questionService)
    {
        _questionService = questionService;
    }

    public async Task<QuestionResponseDto> GetQuestionById(string id)
    {
        return await _questionService.FindQuestionById(id);
    }

    public async Task<IEnumerable<QuestionResponseDto>> GetQuestionList(string? questionName = "")
    {
        return await _questionService.FindQuestions(questionName);
    }
    
}