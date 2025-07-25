﻿using System.Text.RegularExpressions;
using SpdKecPornografiWeb.Exceptions;

namespace SpdKecPornografiWeb.Helpers;

public class RandomCode
{
    public static string GenerateOtpRandom()
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        
        char[] randomArray = new char[9];
        
        for (int i = 0; i < 9; i++)
        {
            randomArray[i] = chars[random.Next(chars.Length)];
        }
        
        return new string(randomArray);
    }

    public static string GeneratePasswordRandom()
    {
        const string chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        
        char[] randomArray = new char[12];
        
        for (int i = 0; i < 12; i++)
        {
            randomArray[i] = chars[random.Next(chars.Length)];
        }
        
        return new string(randomArray);
    }

    public static string ConvertUrlToPublicId(string url)
    {
        // Definisikan pola ekspresi reguler
        string pattern = @"upload/v\d+/(.+)\.(jpg|jpeg|png)";

        // Buat objek Regex
        Regex regex = new Regex(pattern);

        // Cocokkan URL dengan pola ekspresi reguler
        Match match = regex.Match(url);

        // Ambil public ID dari grup yang sesuai
        string publicId = match.Groups[1].Value;
        return publicId;
    }
}