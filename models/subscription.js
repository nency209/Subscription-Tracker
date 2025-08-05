import mongoose from "mongoose";

const subSchema=new mongoose.Schema(
  {
    name:{
      type:String,
      required:[true,'Subscription is required'],
      trim:true,
      minLength:2,
      maxLength:50
    }
    ,price:
    {
      type:Number,
      required:[true,'subscription price is required'],
      min:[0,'price must be greater than 0']
    },
    currency:
    {
      type:String,
      enum:['IND','USD','EUR'],
      default:'IND'
    },
    frequency:
    {
      type:String,
      enum:['daily','weekly','monthly','yearly']
    },
    category:
    {
      type:String,
      enum:['sports','news','lifestyle','technology','politics','other']
    },
    paymentMethod:
    {
      type:String,
      required:true,
      trim:true
    },
    status:
    {
      type:String,
      enum:['active','cancelled','expired'],
      default:'active'
    },
    startDate:
    {
      type:Date,
      required:true,
      validate:
      {
        validator:(value)=>value<= new Date(),
        message:'Start date must be in the past'
      }
    },
     renewalDate:
    {
      type:Date,

      validate:
      {
        validator:function (value){return value >  this.startDate},
        message:'Renewal date must be after the start date'
      }
    },
    user:
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true,
      Index:true
    }
  },{timestamps:true}
)

subSchema.pre('save',function(next)

{
  if(!this.renewalDate)
  {
    const renewalPeriods=
    {
      daily:1,
      weekly:7,
      monthly:30,
      yearly:365
    }
    this.renewalDate=new Date(this.startDate)
    this.renewalDate.setDate(this.renewaltDate.getDate()+renewalPeriods[this.frequency])
  }
  if(this.renewalDate < new Date())
  {
    this.status='expired'
  }

  next()
})

export default mongoose.model('Subscrption',subSchema)