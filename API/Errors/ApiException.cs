namespace API.Errors
{
    public class ApiException
    {
        public ApiException(int statusCode, string message, string details)
        {
            this.statusCode = statusCode;
            this.message = message;
            this.details = details;
        }

        public int statusCode { get; set; }
        public string message { get; set; }
        public string details { get; set; }
    }
}