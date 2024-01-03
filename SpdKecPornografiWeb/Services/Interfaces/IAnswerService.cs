using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Services.Interfaces;

public interface IAnswerService
{
    public Task AddAnswerAsync(string accountId, AnswerRequestDto answerRequestDto);
    public Task<AnswerResponseDto> FindAnswerById(string answerId);
    public Task<IEnumerable<AnswerResponseDto>> FindAnswers(string? name);
    public Task<IEnumerable<AnswerResponseDto>> FindAnswersByQuestionId(string questionId);
    public Task UpdateAnswerAsync(string accountId, string answerId, AnswerRequestDto answerResponseDto);
    public Task DeleteAnswer(string answerId);
    public Task DeleteAnswerByQuestionId(string questionId);
    public string GenerateAnswerCode();
}