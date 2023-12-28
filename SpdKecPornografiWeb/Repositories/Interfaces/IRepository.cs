using System.Linq.Expressions;

namespace SpdKecPornografiWeb.Repositories.Interfaces;

public interface IRepository<T>
{
    Task<T> Save(T entity);
    Task<IEnumerable<T>> SaveAll(IEnumerable<T> entities);
    
    Task<T?> FindById(string id);
    Task<T?> Find(Expression<Func<T, bool>> criteria);
    Task<T?> Find(Expression<Func<T, bool>> criteria, string[] includes);
    
    Task<IEnumerable<T>> FindAll();
    Task<IEnumerable<T>> FindAll(Expression<Func<T, bool>> criteria);
    Task<IEnumerable<T>> FindAll(string[] includes);
    Task<IEnumerable<T>> FindAll(Expression<Func<T, bool>> criteria, string[] includes);

    T Update(T entity);
    void Delete(T entity);
    int Count();
    int Count(Expression<Func<T, bool>> criteria);
}