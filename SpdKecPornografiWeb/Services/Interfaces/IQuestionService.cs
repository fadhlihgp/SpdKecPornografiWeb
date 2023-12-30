using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Services.Interfaces;

public interface IQuestionService
{
    public Task AddQuestionAsync(string accountId, QuestionRequestDto questionRequestDto);
    public Task<QuestionResponseDto> FindQuestionById(string questionId);
    public Task<IEnumerable<QuestionResponseDto>> FindQuestions(string? name);
    public Task UpdateQuestionAsync(string accountId, string questionId, QuestionRequestDto questionRequestDto);
    public Task DeleteQuestion(string questionId);
}