using banking_system_be.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace banking_system_be.Controllers
{
    [RoutePrefix("api/Banking")]
    public class BankingController : ApiController
    {
        BankingSystemEntities db = new BankingSystemEntities();
        [HttpPost]
        [Route("Registration")]
        public ResponseMessage Registration(RegistrationModel registration)
        {
            ResponseMessage responseMessage = new ResponseMessage();
            Registration reg = new Registration();
            if (registration != null)
            {
                try
                {
                    reg.EmpID = registration.EmpID;
                    reg.AadharNo = registration.AadharNo;
                    reg.PanCard = registration.PanCard;
                    reg.EmpName = registration.EmpName;
                    reg.Gender = registration.Gender;
                    reg.DOB = registration.DOB;
                    reg.AccountType = registration.AccountType;
                    reg.PhoneNo = registration.PhoneNo;
                    reg.EmailID = registration.EmailID;
                    reg.Address = registration.Address;
                    reg.Password = registration.Password;
                    reg.InitialAmount = 10000;
                    reg.IsActive = 1;
                    db.Registrations.Add(reg);
                    db.SaveChanges();
                    responseMessage.StatusCode = 200;
                    responseMessage.Message = "Registration successful";
                }
                catch (Exception ex)
                {
                    responseMessage.StatusCode = 100;
                    responseMessage.Message = ex.Message;
                }
            }
            return responseMessage;
        }

        [HttpPost]
        [Route("ListRegistration")]
        public ResponseMessage ListRegistration(RegistrationModel registration)
        {
            ResponseMessage responseMessage = new ResponseMessage();
            List<Registration> listRegistration = new List<Registration>();
            Registration reg = new Registration();
            if (registration != null)
            {
                try
                {
                    if (registration.Type == "Admin")
                    {
                        listRegistration = db.Registrations.Where(x => x.EmailID != "admin" && x.Password != "admin").ToList();
                        responseMessage.StatusCode = 200;
                        responseMessage.Message = "Registration successful";
                        responseMessage.listRegistration = listRegistration;
                    }
                    else if (registration.Type == "Employee")
                    {
                        reg = db.Registrations.FirstOrDefault(x => x.EmailID == registration.EmailID);
                        listRegistration.Add(reg);
                        responseMessage.StatusCode = 200;
                        responseMessage.Message = "Registration successful";
                        responseMessage.listRegistration = listRegistration;
                    }
                    else
                    {
                        responseMessage.StatusCode = 100;
                        responseMessage.Message = "No data available";
                        responseMessage.listRegistration = null;
                    }
                }
                catch (Exception ex)
                {
                    responseMessage.StatusCode = 100;
                    responseMessage.Message = ex.Message;
                    responseMessage.listRegistration = null;
                }
            }
            return responseMessage;
        }

        [HttpPost]
        [Route("Transaction")]
        public ResponseMessage Transaction(TransactionHistoryModel transactionHistory)
        {
            ResponseMessage responseMessage = new ResponseMessage();
            if (transactionHistory != null)
            {
                try
                {
                    TransactionHistory tran = new TransactionHistory();
                    tran.FromAccount = transactionHistory.FromAccount;
                    tran.ToAccount = transactionHistory.ToAccount;
                    tran.Amount = transactionHistory.Amount;
                    tran.TransactionDate = DateTime.Today;
                    db.TransactionHistories.Add(tran);
                    db.SaveChanges();
                    responseMessage.StatusCode = 200;
                    responseMessage.Message = "Transaction completed";
                }
                catch (Exception ex)
                {
                    responseMessage.StatusCode = 100;
                    responseMessage.Message = ex.Message;
                }
            }
            return responseMessage;
        }

        [HttpPost]
        [Route("Login")]
        public ResponseMessage Login(RegistrationModel registration)
        {
            ResponseMessage responseMessage = new ResponseMessage();
            try
            {
                Registration reg = db.Registrations.FirstOrDefault(x => x.EmailID == registration.EmailID && x.Password == registration.Password);
                if (reg != null)
                {
                    responseMessage.StatusCode = 200;
                    responseMessage.Message = "Valid user";
                }
                else
                {
                    responseMessage.StatusCode = 100;
                    responseMessage.Message = "InValid user";
                }
            }
            catch (Exception ex)
            {
                responseMessage.StatusCode = 100;
                responseMessage.Message = ex.Message;
            }
            return responseMessage;
        }

        [HttpPost]
        [Route("TransactionHistory")]
        public ResponseMessage TransactionHistory(TransactionHistoryModel transactionHistory)
        {
            ResponseMessage responseMessage = new ResponseMessage();
            List<TransactionHistory> lstTransactionHistory = new List<TransactionHistory>();
            if (transactionHistory != null)
            {
                try
                {
                    if (transactionHistory.Type == "Admin" && transactionHistory.FromDate == null && transactionHistory.ToDate == null)
                    {
                        lstTransactionHistory = db.TransactionHistories.ToList();
                    }
                    else if (transactionHistory.Type == "Admin" && Convert.ToString(transactionHistory.FromDate) != "" && Convert.ToString(transactionHistory.ToDate) != "")
                    {
                        lstTransactionHistory =
                            db.TransactionHistories.Where(x => x.TransactionDate >= transactionHistory.FromDate && x.TransactionDate <= transactionHistory.ToDate).ToList();
                    }
                    else if (transactionHistory.Type == "Emp")
                    {
                        Registration user = db.Registrations.FirstOrDefault(x => x.EmailID == transactionHistory.FromAccount);
                        string empId = Convert.ToString(user.EmpID);
                        //TransactionHistory transaction = db.TransactionHistories.FirstOrDefault(x => x.FromAccount == empId);                        
                        List<TransactionHistory> transaction = db.TransactionHistories.Where(x => x.FromAccount == empId).ToList();
                        string fromAccount = transaction[0].FromAccount;
                        var UsedAMount = db.TransactionHistories.Where(x => x.FromAccount == fromAccount).Sum(y => y.Amount);
                        for (int i = 0; i < transaction.Count; i++)
                        {
                            transaction[i].Amount = UsedAMount;
                        }
                        lstTransactionHistory = transaction;
                    }
                    responseMessage.listTransactionHistory = lstTransactionHistory;
                    responseMessage.StatusCode = 200;
                    responseMessage.Message = "Data found";
                }
                catch (Exception ex)
                {
                    responseMessage.listTransactionHistory = null;
                    responseMessage.StatusCode = 100;
                    responseMessage.Message = ex.Message;
                }
            }
            return responseMessage;
        }

        [HttpPost]
        [Route("ResetPassword")]
        public ResponseMessage ResetPassword(RegistrationModel registration)
        {
            ResponseMessage responseMessage = new ResponseMessage();
            Registration reg = null;
            try
            {
                reg = db.Registrations.FirstOrDefault(x => x.EmailID == registration.EmailID);
                if (reg != null)
                {       
                    reg.Password = registration.Password;
                    db.Registrations.Add(reg);
                    db.Entry(reg).State = EntityState.Modified;
                    db.SaveChanges();
                    responseMessage.StatusCode = 200;
                    responseMessage.Message = "Password changed";
                }
                else
                {
                    responseMessage.StatusCode = 100;
                    responseMessage.Message = "Some error occured";
                }
            }
            catch (Exception ex)
            {
                responseMessage.StatusCode = 100;
                responseMessage.Message = ex.Message;
            }
            return responseMessage;
        }
    }
}
