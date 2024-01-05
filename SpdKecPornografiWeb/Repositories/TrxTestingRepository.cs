using Microsoft.EntityFrameworkCore;
using SpdKecPornografiWeb.Context;
using SpdKecPornografiWeb.Models;
using SpdKecPornografiWeb.Repositories.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Repositories;

public class TrxTestingRepository : ITrxTestingRepository
{
    private readonly AppDbContext _context;

    public TrxTestingRepository(AppDbContext context)
    {
        _context = context;
    }

    public Diagnosis? FindDiagnosisByAnswerIds(List<string> answerIds)
    {
        string ids = string.Join(",", answerIds.Select((id, index) => $"@p{index}"));

        string query = $@"
        SELECT d.Id as Id, d.Code as DiagnosisCode, d.Name as DiagnosisName, 
               d.Description as DiagnosisDescription, d.Suggestion as DiagnosisSuggestion
        FROM Diagnosis d
        JOIN Answer_Diagnosis ad ON d.Id = ad.DiagnosisId
        JOIN Answer a ON ad.AnswerId = a.Id
        WHERE a.Id IN ({ids})
        GROUP BY d.Id, d.Name
        HAVING COUNT(DISTINCT a.Id) = {answerIds.Count}";

        return _context.Diagnoses.FromSqlRaw(query).FirstOrDefault();
    }
}