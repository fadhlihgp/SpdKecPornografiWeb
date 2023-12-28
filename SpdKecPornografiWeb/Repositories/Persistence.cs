using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using SpdKecPornografiWeb.Context;
using SpdKecPornografiWeb.Repositories.Interfaces;

namespace SpdKecPornografiWeb.Repositories;

public class Persistence : IPersistence
{
    private readonly AppDbContext _context;

    public Persistence(AppDbContext context)
    {
        _context = context;
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }

    public void SaveChanges()
    {
        _context.SaveChanges();
    }

    public async Task<T> ExecuteTransaction<T>(Func<Task<T>> transaction)
    {
        var strategy = _context.Database.CreateExecutionStrategy();
        var result = await strategy.ExecuteAsync(async () =>
        {
            var trans = await _context.Database.BeginTransactionAsync();
            try
            {
                var resultTrx = await transaction();
                await trans.CommitAsync();
                await _context.SaveChangesAsync();
                return resultTrx;
            }
            catch (Exception e)
            {
                await trans.RollbackAsync();
                throw;
            }
        });
        return result;
    }
}