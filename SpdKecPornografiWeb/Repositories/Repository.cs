using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using SpdKecPornografiWeb.Context;
using SpdKecPornografiWeb.Repositories.Interfaces;

namespace SpdKecPornografiWeb.Repositories;

public class Repository<T> : IRepository<T> where T : class
{
    private readonly AppDbContext _context;

    public Repository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<T> Save(T entity)
    {
        var save = await _context.Set<T>().AddAsync(entity);
        return save.Entity;
    }

    public async Task<IEnumerable<T>> SaveAll(IEnumerable<T> entities)
    {
        var enumerable = entities.ToList();
        await _context.Set<T>().AddRangeAsync(enumerable.ToList());
        return enumerable.ToList();
    }

    public async Task<T?> FindById(string id)
    {
        var findById = await _context.Set<T>().FindAsync(id);
        return findById;
    }

    public async Task<T?> Find(Expression<Func<T, bool>> criteria)
    {
        var find = await _context.Set<T>().FirstOrDefaultAsync(criteria);
        return find;
    }

    public async Task<T?> Find(Expression<Func<T, bool>> criteria, string[] includes)
    {
        var find = _context.Set<T>().AsQueryable();
        foreach (var include in includes)
        {
            find = find.Include(include);
        }
        return await find.FirstOrDefaultAsync(criteria);
    }

    public async Task<IEnumerable<T>> FindAll()
    {
        return await _context.Set<T>().ToListAsync();
    }

    public async Task<IEnumerable<T>> FindAll(Expression<Func<T, bool>> criteria)
    {
        var result = await _context.Set<T>().Where(criteria).ToListAsync();
        return result;
    }

    public async Task<IEnumerable<T>> FindAll(string[] includes)
    {
        var result = _context.Set<T>().AsQueryable();
        foreach (var include in includes)
        {
            result = result.Include(include);
        }

        return await result.ToListAsync();
    }

    public async Task<IEnumerable<T>> FindAll(string[] includes, Expression<Func<T, object>> orderBy)
    {
        var result = _context.Set<T>().AsQueryable();
        foreach (var include in includes)
        {
            result = result.Include(include);
        }

        result = result.OrderBy(orderBy);
        
        return await result.ToListAsync();
    }

    public async Task<IEnumerable<T>> FindAll(Expression<Func<T, bool>> criteria, string[] includes)
    {
        var result = _context.Set<T>().AsQueryable();
        foreach (var include in includes)
        {
            result = result.Include(include);
        }

        return await result.Where(criteria).ToListAsync();
    }

    public async Task<IEnumerable<T>> FindAll(Expression<Func<T, bool>> criteria, Expression<Func<T, object>>? sortBy, string[] includes)
    {
        var result = _context.Set<T>().AsQueryable();
        foreach (var include in includes)
        {
            result = result.Include(include);
        }

        if (sortBy != null)
        {
            result = result.OrderBy(sortBy);
        }
        
        return await result.Where(criteria).ToListAsync();
    }

    public T Update(T entity)
    {
        return _context.Set<T>().Update(entity).Entity;
    }

    public void Delete(T entity)
    {
        _context.Set<T>().Remove(entity);
    }

    public void DeleteAll(IEnumerable<T> entities)
    {
        _context.Set<T>().RemoveRange(entities);
    }

    public int Count()
    {
        return _context.Set<T>().Count();
    }

    public int Count(Expression<Func<T, bool>> criteria)
    {
        return _context.Set<T>().Where(criteria).Count();
    }
}