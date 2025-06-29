using HotChocolate.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using SpdKecPornografiWeb.Context;
using SpdKecPornografiWeb.Models;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.GraphQL.Queries;

[ExtendObjectType("Query")]
[Authorize]
public class DiagnosisQuery
{

    private readonly AppDbContext _dbContext;
    private readonly IDiagnosisService _diagnosisService;

    public DiagnosisQuery(AppDbContext dbContext, IDiagnosisService diagnosisService)
    {
        _dbContext = dbContext;
        _diagnosisService = diagnosisService;
    }
    
    public Diagnosis? GetDiagnosisById(string id)
    {
        var diagnosis = _dbContext.Diagnoses.FirstOrDefault(d => d.Id == id && !d.IsDeleted);
        return diagnosis;
    }
    
    public async Task<IEnumerable<DiagnosisResponseDto>> GetDiagnosisList(string? diagnosisName = "")
    {
        return await _diagnosisService.FindDiagnosis(diagnosisName);
    }
}