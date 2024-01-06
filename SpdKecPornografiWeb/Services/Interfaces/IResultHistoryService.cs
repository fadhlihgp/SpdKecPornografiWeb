using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Services.Interfaces;

public interface IResultHistoryService
{
    public Task<ResultHistoryResponseDto> AddResultHistoryAndGetDiagnosis(string accountId, List<string> answerIds);
    public Task<IEnumerable<ResultHistoryResponseDto>> GetAllResultHistories(string accountId, string? date );
    public Task<ResultHistoryResponseDto> GetResultHistoryById(string id);
}