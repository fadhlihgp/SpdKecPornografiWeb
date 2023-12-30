using SpdKecPornografiWeb.Exceptions;
using SpdKecPornografiWeb.Models;
using SpdKecPornografiWeb.Repositories.Interfaces;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Services;

public class AnswerService : IAnswerService
{
    private readonly IRepository<Answer> _answerRepository;
    private readonly IPersistence _persistence; 

    public AnswerService(IRepository<Answer> answerRepository, IPersistence persistence)
    {
        _answerRepository = answerRepository;
        _persistence = persistence;
    }

    public async Task AddAnswerAsync(string accountId, AnswerRequestDto answerRequestDto)
    {
        await _persistence.ExecuteTransaction(async () =>
        {
            var answerSave = new Answer
            {
                Name = answerRequestDto.AnswerName,
                AnswerCode = answerRequestDto.AnswerCode,
                QuestionId = answerRequestDto.QuestionId,
                CreatedById = accountId,
                UpdatedById = accountId
            };
            return await _answerRepository.Save(answerSave);
        });
    }

    public async Task<AnswerResponseDto> FindAnswerById(string answerId)
    {
        var findAnswer = await FindAnswerAsync(answerId);
        return new AnswerResponseDto
        {
            Id = findAnswer.AnswerCode,
            QuestionCode = findAnswer.Question?.QuestionCode,
            QuestionName = findAnswer.Question?.Name,
            AnswerCode = findAnswer.AnswerCode,
            AnswerName = findAnswer.Name,
            CreatedAt = findAnswer.CreatedAt,
            CreatedBy = findAnswer.CreatedBy?.Fullname,
            UpdatedAt = findAnswer.UpdatedAt,
            UpdatedName = findAnswer.UpdatedBy?.Fullname
        };
    }

    public async Task<IEnumerable<AnswerResponseDto>> FindAnswers(string? name = "")
    {
        var answers =
            await _answerRepository.FindAll(a => a.Name.ToLower().Contains(name), new[] { "Question" });
        var responses = answers.Select(a => new AnswerResponseDto
        {
            Id = a.Id,
            QuestionCode = a.Question?.QuestionCode,
            QuestionName = a.Question?.Name,
            AnswerCode = a.AnswerCode,
            AnswerName = a.Name,
            CreatedAt = a.CreatedAt,
            UpdatedAt = a.UpdatedAt,
        }).ToList();
        return responses;
    }

    public async Task UpdateAnswerAsync(string accountId, string answerId, AnswerRequestDto answerResponseDto)
    {
        var answer = await FindAnswerAsync(answerId);
        answer.AnswerCode = answerResponseDto.AnswerCode;
        answer.Name = answerResponseDto.AnswerName;
        answer.UpdatedAt = DateTime.Now;
        answer.UpdatedById = accountId;
        await _persistence.ExecuteTransaction<>(() =>
        {
            _answerRepository.Update(answer);
        });
    }

    public async Task DeleteAnswer(string answerId)
    {
        var answer = await FindAnswerAsync(answerId);
        await _persistence.ExecuteTransaction<>(() =>
        {
            _answerRepository.Delete(answer);
        });
    }

    private async Task<Answer> FindAnswerAsync(string answerId)
    {
        var findAnswerId = await _answerRepository.Find(a => a.Id.Equals(answerId), new[] { "Account", "Question" });
        if (findAnswerId == null) throw new NotFoundException("Data pertanyaan tidak ditemukan");
        return findAnswerId;
    }
}