using SpdKecPornografiWeb.Exceptions;
using SpdKecPornografiWeb.Models;
using SpdKecPornografiWeb.Repositories.Interfaces;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Services;

public class AnswerService : IAnswerService
{
    private readonly IRepository<Answer> _answerRepository;
    private readonly IAnswerDiagnosisService _answerDiagnosisService;
    private readonly IPersistence _persistence; 

    public AnswerService(IRepository<Answer> answerRepository, IPersistence persistence, IAnswerDiagnosisService answerDiagnosisService)
    {
        _answerRepository = answerRepository;
        _persistence = persistence;
        _answerDiagnosisService = answerDiagnosisService;
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
            QuestionId = findAnswer.QuestionId,
            QuestionCode = findAnswer.Question?.QuestionCode,
            QuestionName = findAnswer.Question?.Name,
            AnswerCode = findAnswer.AnswerCode,
            AnswerName = findAnswer.Name,
            CreatedAt = findAnswer.CreatedAt,
            CreatedBy = findAnswer.CreatedBy?.Fullname,
            UpdatedAt = findAnswer.UpdatedAt,
            UpdatedBy = findAnswer.UpdatedBy?.Fullname
        };
    }

    public async Task<IEnumerable<AnswerResponseDto>> FindAnswers(string? name = "")
    {
        var answers = name != null
            ? await _answerRepository.FindAll(
                a => a.Name.ToLower().Contains(name.ToLower()) || a.AnswerCode.ToLower().Contains(name.ToLower()),
                a => a.Question.QuestionCode,
                new[] { "Question", "CreatedBy", "UpdatedBy" })
            : await _answerRepository.FindAll(new[] { "CreatedBy", "UpdatedBy", "Question" }, a => a.Question.QuestionCode);
            
        var responses = answers.Select(a => new AnswerResponseDto
        {
            Id = a.Id,
            QuestionCode = a.Question?.QuestionCode,
            QuestionName = a.Question?.Name,
            QuestionId = a.QuestionId,
            AnswerCode = a.AnswerCode,
            AnswerName = a.Name,
            CreatedAt = a.CreatedAt,
            UpdatedAt = a.UpdatedAt,
            UpdatedBy = a.UpdatedBy?.Fullname,
            CreatedBy = a.CreatedBy?.Fullname
        }).ToList();
        return responses;
    }

    public async Task<IEnumerable<AnswerResponseDto>> FindAnswersByQuestionId(string questionId)
    {
        var answers = await _answerRepository.FindAll(
                a => a.QuestionId.Equals(questionId),
                new[] { "Question", "CreatedBy", "UpdatedBy" });
            
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
        answer.QuestionId = answerResponseDto.QuestionId;
        _answerRepository.Update(answer);
        await _persistence.SaveChangesAsync();
    }

    public async Task DeleteAnswer(string answerId)
    {
        var answer = await FindAnswerAsync(answerId);
        await _persistence.ExecuteTransaction(async () =>
        {
            _answerRepository.Delete(answer);
            await _answerDiagnosisService.DeleteAnswerDiagnosisByAnswerId(answerId);
            return answer;
        });
    }

    public async Task DeleteAnswerByQuestionId(string questionId)
    {
        var answers = await _answerRepository.FindAll(a => a.QuestionId.Equals(questionId));
        foreach (var answer in answers)
        {
            await _answerDiagnosisService.DeleteAnswerDiagnosisByAnswerId(answer.Id);
        }
        _answerRepository.DeleteAll(answers);
        // await _persistence.SaveChangesAsync();
    }

    public string GenerateAnswerCode()
    {
        var count = _answerRepository.Count() + 1;
        var dateNow = DateTime.Now.Day;
        var random = new Random().Next(20);
        return $"A{count}{dateNow}{random}";
    }
    
    private async Task<Answer> FindAnswerAsync(string answerId)
    {
        var findAnswerId = await _answerRepository.Find(a => a.Id.Equals(answerId), new[] { "CreatedBy", "UpdatedBy","Question" });
        if (findAnswerId == null) throw new NotFoundException("Data pertanyaan tidak ditemukan");
        return findAnswerId;
    }
}