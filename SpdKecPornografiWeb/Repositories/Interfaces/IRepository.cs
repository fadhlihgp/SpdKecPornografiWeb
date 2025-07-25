﻿using System.Linq.Expressions;
using Expression = CloudinaryDotNet.Expression;

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
    Task<IEnumerable<T>> FindAll(string[] includes, Expression<Func<T, object>> orderBy);
    Task<IEnumerable<T>> FindAll(Expression<Func<T, bool>> criteria, string[] includes);
    Task<IEnumerable<T>> FindAll(Expression<Func<T, bool>> criteria, Expression<Func<T, object>>? orderBy, string[] includes);
    
    T Update(T entity);
    void Delete(T entity);
    void DeleteAll(IEnumerable<T> entities);
    int Count();
    int Count(Expression<Func<T, bool>> criteria);
}