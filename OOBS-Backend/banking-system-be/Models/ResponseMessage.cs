using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace banking_system_be.Models
{
    public class ResponseMessage
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public List<TransactionHistory> listTransactionHistory { get; set; }
        public List<Registration> listRegistration { get; set; }
    }
}