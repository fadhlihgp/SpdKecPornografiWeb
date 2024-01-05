using SpdKecPornografiWeb.Exceptions;
using SpdKecPornografiWeb.Models;
using SpdKecPornografiWeb.Repositories.Interfaces;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Services;

public class AnswerDiagnosisService : IAnswerDiagnosisService
{
    private readonly IRepository<AnswerDiagnosis> _answerDiagnosisRepository;
    private readonly IPersistence _persistence;

    public AnswerDiagnosisService(IRepository<AnswerDiagnosis> answerDiagnosisRepository, IPersistence persistence)
    {
        _answerDiagnosisRepository = answerDiagnosisRepository;
        _persistence = persistence;
    }

    public async Task AddAnswerDiagnosisAsync(string accountId, AnswerDiagnosisRequestDto answerDiagnosisRequestDto)
    {
        await ValidateFindByAnswerIdAndDiagnosisId(answerDiagnosisRequestDto.AnswerId, answerDiagnosisRequestDto.DiagnosisId);
        await _persistence.ExecuteTransaction(async () =>
        {
            var saveTrx = new AnswerDiagnosis
            {
                AnswerId = answerDiagnosisRequestDto.AnswerId,
                DiagnosisId = answerDiagnosisRequestDto.DiagnosisId,
                CreatedById = accountId,
                UpdatedById = accountId
            };
            return await _answerDiagnosisRepository.Save(saveTrx);
        });
    }

    public async Task UpdateAnswerDiagnosisAsync(string accountId, string answerDiagnosisId,
        AnswerDiagnosisRequestDto answerDiagnosisRequest)
    {
        var answerDiagnosis = await ValidateAnswerDiagnosisById(answerDiagnosisId);
        await ValidateFindByAnswerIdAndDiagnosisId(answerDiagnosisRequest.AnswerId, answerDiagnosisRequest.DiagnosisId);
        answerDiagnosis.AnswerId = answerDiagnosisRequest.AnswerId;
        answerDiagnosis.DiagnosisId = answerDiagnosisRequest.DiagnosisId;
        answerDiagnosis.UpdatedAt = DateTime.Now;
        answerDiagnosis.UpdatedById = accountId;
        _answerDiagnosisRepository.Update(answerDiagnosis);
        await _persistence.SaveChangesAsync();
    }

    public async Task<IEnumerable<AnswerDiagnosisResponseDto>> FindAllAnswerDiagnosisAsync(string? code = "")
    {
        var findAll = code == null ? await _answerDiagnosisRepository.FindAll(ad => !ad.Diagnosis.IsDeleted, 
            ad => ad.Diagnosis.Name,
            new[] { "Diagnosis", "Answer", "Answer.Question", "CreatedBy", "UpdatedBy" }) : 
            await _answerDiagnosisRepository.FindAll(ad => !ad.Diagnosis.IsDeleted && (ad.Diagnosis.Code.Contains(code) || ad.Answer.AnswerCode.Contains(code) || ad.Answer.Question.QuestionCode.Contains(code)), 
                ad => ad.Diagnosis.Name,
                new[] { "Diagnosis", "Answer", "Answer.Question", "CreatedBy", "UpdatedBy" });
        
        return findAll.Select(ad => new AnswerDiagnosisResponseDto
        {
            Id = ad.Id,
            DiagnosisId = ad.DiagnosisId,
            DiagnosisCode = ad.Diagnosis?.Code,
            DiagnosisName = ad.Diagnosis?.Name,
            QuestionId = ad.Answer.QuestionId,
            QuestionCode = ad.Answer.Question.QuestionCode,
            QuestionName = ad.Answer.Question.Name,
            AnswerId = ad.AnswerId,
            AnswerCode = ad.Answer.AnswerCode,
            AnswerName = ad.Answer.Name
        }).ToList();
    }

    public Task<AnswerDiagnosis> FindAnswerDiagnosisByIdItself(string answerId, string diagnosisId)
    {
        throw new NotImplementedException();
    }

    public async Task<AnswerDiagnosisResponseDto> FindAnswerDiagnosisById(string answerDiagnosisId)
    {
        var findAnswerDiagnosis = await _answerDiagnosisRepository.Find(ad => !ad.Diagnosis.IsDeleted && ad.Id.Equals(answerDiagnosisId),
            new[] { "Diagnosis", "Answer", "Answer.Question", "CreatedBy", "UpdatedBy" });
        if (findAnswerDiagnosis == null) throw new NotFoundException("Data relasi tidak ditemykan");
        return new AnswerDiagnosisResponseDto
        {
            Id = findAnswerDiagnosis.Id,
            DiagnosisId = findAnswerDiagnosis.DiagnosisId,
            DiagnosisCode = findAnswerDiagnosis.Diagnosis.Code,
            DiagnosisName = findAnswerDiagnosis.Diagnosis.Name,
            DiagnosisDescription = findAnswerDiagnosis.Diagnosis.Description,
            DiagnosisSuggestion = findAnswerDiagnosis.Diagnosis.Suggestion,
            QuestionId = findAnswerDiagnosis.Answer.Question.Id,
            QuestionCode = findAnswerDiagnosis.Answer.Question.QuestionCode,
            QuestionName = findAnswerDiagnosis.Answer.Question.Name,
            AnswerId = findAnswerDiagnosis.AnswerId,
            AnswerCode = findAnswerDiagnosis.Answer.AnswerCode,
            AnswerName = findAnswerDiagnosis.Answer.Name,
            CreatedAt = findAnswerDiagnosis.CreatedAt,
            CreatedBy = findAnswerDiagnosis.CreatedBy.Fullname,
            UpdatedAt = findAnswerDiagnosis.UpdatedAt,
            UpdatedBy = findAnswerDiagnosis.UpdatedBy.Fullname
        };
    }

    public async Task DeleteAnswerDiagnosisById(string answerDiagnosisId)
    {
        var findById = await _answerDiagnosisRepository.FindById(answerDiagnosisId);
        if (findById == null) throw new NotFoundException("Data relasi tidak ditemukan");
        _answerDiagnosisRepository.Delete(findById);
        await _persistence.SaveChangesAsync();
    }

    public async Task DeleteAnswerDiagnosisByAnswerId(string answerId)
    {
        var findByAnswerId = await _answerDiagnosisRepository.FindAll(ad => ad.AnswerId.Equals(answerId));
        if (findByAnswerId.Count() > 0)
        {
            _answerDiagnosisRepository.DeleteAll(findByAnswerId);
            await _persistence.SaveChangesAsync();
        }
    }

    public async Task DeleteAnswerDiagnosisByDiagnosisId(string diagnosisId)
    {
        var findByDiagnosisId = await _answerDiagnosisRepository.FindAll(ad => ad.DiagnosisId.Equals(diagnosisId));
        if (findByDiagnosisId.Count() > 0)
        {
            _answerDiagnosisRepository.DeleteAll(findByDiagnosisId);
            await _persistence.SaveChangesAsync();
        }
    }
    
    private async Task<AnswerDiagnosis?> ValidateFindByAnswerIdAndDiagnosisId(string answerId, string diagnosisId)
    {
        var findById = await _answerDiagnosisRepository.Find(ad =>
            ad.AnswerId.Equals(answerId) &&
            ad.DiagnosisId.Equals(diagnosisId));
        if (findById != null) throw new BadRequestException("Data relasi sudah tersedia !");
        return findById;
    }

    private async Task<AnswerDiagnosis> ValidateAnswerDiagnosisById(string answerDiagnosisId)
    {
        var findAnswerDiagnosis = await _answerDiagnosisRepository.FindById(answerDiagnosisId);
        if (findAnswerDiagnosis == null) throw new NotFoundException("Data relasi tidak ditemukan");
        return findAnswerDiagnosis;
    }
}