using SpdKecPornografiWeb.Exceptions;
using SpdKecPornografiWeb.Models;
using SpdKecPornografiWeb.Repositories.Interfaces;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Services;

public class QuestionService : IQuestionService
{
    private readonly IRepository<Question> _questionRepository;
    private readonly IPersistence _persistence;

    public QuestionService(IRepository<Question> questionRepository, IPersistence persistence)
    {
        _questionRepository = questionRepository;
        _persistence = persistence;
    }

    public async Task AddQuestionAsync(string accountId, QuestionRequestDto questionRequestDto)
    {
        await _persistence.ExecuteTransaction(async () =>
        {
            var question = new Question
            {
                Name = questionRequestDto.QuestionName,
                QuestionCode = questionRequestDto.QuestionCode,
                CreatedById = accountId,
                UpdatedById = accountId
            };

            var saveQuestion = await _questionRepository.Save(question);
            return saveQuestion;
        });
    }

    public async Task<QuestionResponseDto> FindQuestionById(string questionId)
    {
        var findQuestion = await FindQuestionByIdValidation(questionId);
        return new QuestionResponseDto
        {
            Id = findQuestion.Id,
            QuestionName = findQuestion.Name,
            QuestionCode = findQuestion.QuestionCode,
            CreatedAt = findQuestion.CreatedAt,
            CreatedBy = findQuestion.CreatedBy?.Fullname,
            UpdatedAt = findQuestion.UpdatedAt,
            UpdatedBy = findQuestion.UpdatedBy?.Fullname,
            Answers = findQuestion.Answers?.Select(q => new AnswerResponseDto
            {
                Id = q.Id,
                AnswerCode = q.AnswerCode,
                AnswerName = q.Name,
                CreatedAt = q.CreatedAt,
                UpdatedAt = q.UpdatedAt,
            }).ToList()
        };
    }

    public async Task<IEnumerable<QuestionResponseDto>> FindQuestions(string? name = "")
    {
        var questions = await _questionRepository.FindAll(q => q.Name.ToLower().Contains(name), new []{ "Account", "Answers" });
        var responses = questions.Select(question => new QuestionResponseDto
        {
            Id = question.Id,
            QuestionName = question.Name,
            QuestionCode = question.QuestionCode,
            CreatedAt = question.CreatedAt,
            CreatedBy = question.CreatedBy?.Fullname,
            UpdatedAt = question.UpdatedAt,
            UpdatedBy = question.UpdatedBy?.Fullname
        }).ToList();
        return responses;
    }

    public async Task UpdateQuestionAsync(string accountId, string questionId, QuestionRequestDto questionRequestDto)
    {
        var findQuestion = await FindQuestionByIdValidation(questionId);
        findQuestion.Name = questionRequestDto.QuestionName;
        findQuestion.QuestionCode = questionRequestDto.QuestionCode;
        findQuestion.UpdatedAt = DateTime.Now;
        findQuestion.UpdatedById = accountId;
        await _persistence.ExecuteTransaction(() => Task.FromResult(_questionRepository.Update(findQuestion)));
    }

    public async Task DeleteQuestion(string questionId)
    {
        var findQuestion = await FindQuestionByIdValidation(questionId);
        await _persistence.ExecuteTransaction<>(() =>
        {
            _questionRepository.Delete(findQuestion);
        });
    }

    private async Task<Question> FindQuestionByIdValidation(string questionId)
    {
        var findQuestion = await _questionRepository.Find(q => q.Id.Equals(questionId) , new []{ "Account", "Answers" });
        if (findQuestion == null) throw new NotFoundException("Data pertanyaan tidak ditemukan");
        return findQuestion;
    }
}