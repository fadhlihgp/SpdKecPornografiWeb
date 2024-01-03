using SpdKecPornografiWeb.Exceptions;
using SpdKecPornografiWeb.Models;
using SpdKecPornografiWeb.Repositories.Interfaces;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Services;

public class DiagnosisService : IDiagnosisService
{
    private readonly IRepository<Diagnosis> _diagnosisRepository;
    private readonly IPersistence _persistence;

    public DiagnosisService(IRepository<Diagnosis> diagnosisRepository, IPersistence persistence)
    {
        _diagnosisRepository = diagnosisRepository;
        _persistence = persistence;
    }

    public async Task AddDiagnosisAsync(string accountId, DiagnosisRequestDto diagnosisRequestDto)
    {
        Diagnosis diagnosis = new Diagnosis
        {
            Name = diagnosisRequestDto.DiagnosisName,
            Description = diagnosisRequestDto.DiagnosisDescription,
            Suggestion = diagnosisRequestDto.DiagnosisSuggestion,
            Code = diagnosisRequestDto.DiagnosisCode,
            CreatedById = accountId,
            UpdatedById = accountId
        };
        await _persistence.ExecuteTransaction(async () => await _diagnosisRepository.Save(diagnosis));
    }

    public async Task<DiagnosisResponseDto> FindDiagnosisById(string diagnosisId)
    {
        var findDiagnosis = await FindDiagnosisByIdValidate(diagnosisId);
        return new DiagnosisResponseDto
        {
            Id = findDiagnosis.Id,
            DiagnosisName = findDiagnosis.Name,
            DiagnosisCode = findDiagnosis.Code,
            DiagnosisDescription = findDiagnosis.Description,
            DiagnosisSuggestion = findDiagnosis.Suggestion,
            CreatedAt = findDiagnosis.CreatedAt,
            CreatedBy = findDiagnosis.CreatedBy?.Fullname,
            UpdatedAt = findDiagnosis.UpdatedAt,
            UpdatedBy = findDiagnosis.UpdatedBy?.Fullname
        };
    }

    public async Task<IEnumerable<DiagnosisResponseDto>> FindDiagnosis(string? name)
    {
        var diagnosisList = name == null
            ? await _diagnosisRepository.FindAll(
                d => !d.IsDeleted, diagnosis => diagnosis.CreatedAt,
                new[] { "CreatedBy", "UpdatedBy" })
            : await _diagnosisRepository.FindAll(
                d => (d.Name.ToLower().Contains(name.ToLower()) || d.Code.ToLower().Contains(name.ToLower())) && !d.IsDeleted, diagnosis => diagnosis.CreatedAt,
                new[] { "CreatedBy", "UpdatedBy" });
        return diagnosisList.Select(diagnosis => new DiagnosisResponseDto
        {
            Id = diagnosis.Id,
            DiagnosisName = diagnosis.Name,
            DiagnosisCode = diagnosis.Code,
            DiagnosisDescription = diagnosis.Description,
            DiagnosisSuggestion = diagnosis.Suggestion,
            CreatedAt = diagnosis.CreatedAt,
            CreatedBy = diagnosis.CreatedBy?.Fullname,
            UpdatedAt = diagnosis.UpdatedAt,
            UpdatedBy = diagnosis.UpdatedBy?.Fullname
        });
    }

    public async Task UpdateDiagnosisAsync(string accountId, string diagnosisId, DiagnosisRequestDto diagnosisRequestDto)
    {
        var findDiagnosis = await FindDiagnosisByIdValidate(diagnosisId);
        findDiagnosis.Code = diagnosisRequestDto.DiagnosisCode;
        findDiagnosis.Name = diagnosisRequestDto.DiagnosisName;
        findDiagnosis.Suggestion = diagnosisRequestDto.DiagnosisSuggestion;
        findDiagnosis.Description = diagnosisRequestDto.DiagnosisDescription;
        findDiagnosis.UpdatedAt = DateTime.Now;
        findDiagnosis.UpdatedById = accountId;
        _diagnosisRepository.Update(findDiagnosis);
        await _persistence.SaveChangesAsync();
    }

    public async Task DeleteDiagnosis(string accountId, string diagnosisId)
    {
        var findDiagnosis = await FindDiagnosisByIdValidate(diagnosisId);
        findDiagnosis.IsDeleted = true;
        findDiagnosis.UpdatedAt = DateTime.Now;
        findDiagnosis.UpdatedById = accountId;
        _diagnosisRepository.Update(findDiagnosis);
        await _persistence.SaveChangesAsync();
    }

    public string GenerateDiagnosisCode()
    {
        var count = _diagnosisRepository.Count() + 1;
        var randomNumb = new Random().Next(20);
        var month = DateTime.Now.Day;
        return $"D{count}{month}{randomNumb}";
    }

    private async Task<Diagnosis> FindDiagnosisByIdValidate(string diagnosisId)
    {
        var findDiagnosis =
            await _diagnosisRepository.Find(d => d.Id.Equals(diagnosisId) && !d.IsDeleted, new[] { "CreatedBy", "UpdatedBy" });
        if (findDiagnosis == null) throw new NotFoundException("Diagnosis Tidak Ditemukan");
        return findDiagnosis;
    }
}