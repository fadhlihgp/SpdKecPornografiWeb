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
        string ids = string.Join(",", answerIds.Select((id, index) => $"'{id}'"));

        string query = $@"
        SELECT d.""Id"", d.""Code"", d.""Name"", d.""Description"", d.""Suggestion"",
               d.""CreatedAt"", d.""CreatedById"", d.""UpdatedAt"", d.""UpdatedById"", d.""IsDeleted""
        FROM ""Diagnosis"" d
        JOIN ""Answer_Diagnosis"" ad ON d.""Id"" = ad.""DiagnosisId""
        JOIN ""Answer"" a ON ad.""AnswerId"" = a.""Id""
        WHERE a.""Id"" IN ({ids})
        GROUP BY d.""Id"", d.""Name"", d.""Code"", d.""Description"", d.""Suggestion"",
               d.""CreatedAt"", d.""CreatedById"", d.""UpdatedAt"", d.""UpdatedById"", d.""IsDeleted""
        HAVING COUNT(DISTINCT a.""Id"") = {answerIds.Count}";

        var diag = _context.Diagnoses
            .FirstOrDefault(d => d.AnswerDiagnoses.Count(a => answerIds.Contains(a.Id)) == answerIds.Count);
        
        // var diagnosis = (from d in _context.Diagnoses
        //               join ad in _context.AnswerDiagnoses on d.Id equals ad.DiagnosisId
        //               join a in _context.Answers on ad.AnswerId equals a.Id
        //               where answerIds.Contains(ad.AnswerId)
        //               group d by new { d.Id, d.Name, d.Code, d.Description, d.Suggestion, d.CreatedAt, d.CreatedById, d.UpdatedAt, d.UpdatedBy, d.IsDeleted } into g
        //               where g.Count() == answerIds.Count
        //               select g.FirstOrDefault()).FirstOrDefault();
        
        // var diagnosis = _context.Diagnoses
        //     .Where(d =>
        //         d.AnswerDiagnoses
        //             .Select(ad => ad.AnswerId)
        //             .Distinct()
        //             .Intersect(answerIds)
        //             .Count() == answerIds.Count)
        //     .FirstOrDefault();

        // return diagnosis;
        // return _context.AnswerDiagnoses.Where(x => x.AnswerId != null && answerIds.Contains(x.AnswerId))
        //     .Select(x => x.Diagnosis).FirstOrDefault();

        return _context.Diagnoses.FromSqlRaw(query).FirstOrDefault();
    }
}