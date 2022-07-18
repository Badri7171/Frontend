using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace banking_system_be.Models
{
    public class TransactionHistoryModel
    {
        public int ID { get; set; }
        public string FromAccount { get; set; }
        public string ToAccount { get; set; }
        public decimal Amount { get; set; }
        public decimal UsedAmount { get; set; }
        public decimal Balance { get; set; }
        public DateTime TransactionDate { get; set; }
        public string Type { get; set; }
        public Nullable<DateTime> FromDate { get; set; }
        public Nullable<DateTime> ToDate { get; set; }
    }
}