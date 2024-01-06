using SpdKecPornografiWeb.Exceptions;
using SpdKecPornografiWeb.Models;
using SpdKecPornografiWeb.Repositories.Interfaces;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Services;

public class ResultHistoryService : IResultHistoryService
{
    private readonly ITrxTestingService _trxTestingService;
    private readonly IRepository<ResultHistory> _resultHistoryRepository;
    private readonly IPersistence _persistence;

    public ResultHistoryService(ITrxTestingService trxTestingService, IRepository<ResultHistory> resultHistoryRepository, IPersistence persistence)
    {
        _trxTestingService = trxTestingService;
        _resultHistoryRepository = resultHistoryRepository;
        _persistence = persistence;
    }

    public async Task<ResultHistoryResponseDto> AddResultHistoryAndGetDiagnosis(string accountId, List<string> answerIds)
    {
        string dateFormat = DateTime.Now.ToString("ddMMyy");
        var count = _resultHistoryRepository.Count(rh => rh.AccountId == accountId) + 1;
        var accCode = accountId.Substring(0, 4);
        string generateCode = $"TST-{accCode}{dateFormat}{count}";
        
        var diagnosis = _trxTestingService.GetDiagnosisByAnswerIds(answerIds);
        var resultHistorySave = new ResultHistory
        {
            TestCode = generateCode,
            DiagnosisId = diagnosis.Id,
            AccountId = accountId,
        };

        var response = await _persistence.ExecuteTransaction(async () => await _resultHistoryRepository.Save(resultHistorySave));
        return await GetResultHistoryById(response.Id);
    }

    public async Task<IEnumerable<ResultHistoryResponseDto>> GetAllResultHistories(string accountId, string? date = "")
    {
        DateTime? searchDate = string.IsNullOrEmpty(date) ? null : DateTime.Parse(date);

        var resultHistories = await _resultHistoryRepository.FindAll(
            rh => rh.AccountId == accountId &&
                  (!searchDate.HasValue || rh.CreatedAt.Date == searchDate),
            rh => rh.CreatedAt,
            new[] { "Account", "Diagnosis" });
        
        return resultHistories.Select(history => new ResultHistoryResponseDto
        {
            Id = history.Id,
            TestingCode = history.TestCode,
            CreatedAt = history.CreatedAt,
            Account = new AccountDto
            {
                Id = history.AccountId,
                Fullname = history.Account.Fullname,
                Username = history.Account.Username,
                Email = history.Account.Email,
            },
            Diagnosis = new DiagnosisResponseDto
            {
                Id = history.DiagnosisId,
                DiagnosisName = history.Diagnosis.Name,
                DiagnosisCode = history.Diagnosis.Code,
                DiagnosisDescription = history.Diagnosis.Description,
                DiagnosisSuggestion = history.Diagnosis.Suggestion,
            }
        });
    }

    public async Task<ResultHistoryResponseDto> GetResultHistoryById(string id)
    {
        var history = await _resultHistoryRepository.Find(
            rh => rh.Id == id,
            new[] { "Account", "Diagnosis" });
        if (history == null) throw new NotFoundException("Riwayat pengujian tidak ditemukan");
        
        return new ResultHistoryResponseDto
        {
            Id = history.Id,
            TestingCode = history.TestCode,
            Account = new AccountDto
            {
                Id = history.AccountId,
                Fullname = history.Account.Fullname,
                Username = history.Account.Username,
                Email = history.Account.Email,
            },
            Diagnosis = new DiagnosisResponseDto
            {
                Id = history.DiagnosisId,
                DiagnosisName = history.Diagnosis.Name,
                DiagnosisCode = history.Diagnosis.Code,
                DiagnosisDescription = history.Diagnosis.Description,
                DiagnosisSuggestion = history.Diagnosis.Suggestion,
            }
        };
    }
}