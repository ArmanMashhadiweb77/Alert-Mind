export enum DocType {
  // [Description("آیکن")]
  Icon = 1,
  // [Description("بنر")]
  Banner = 2,
  // [Description("عکس")]
  Image = 3,
  // [Description("لوگو")]
  Logo = 4,
  // [Description("صفحه اول شناسنامه")]
  TheFirstPageOfTheBirthCertificate = 5,
  // [Description("روی کارت ملی")]
  OnTheNationalCard = 6,
  // [Description("پشت کارت ملی")]
  BehindTheNationalCard = 7,
  // [Description("مجوز کسب و کار")]
  BusinessLicense = 8,
  // [Description("مجوز سلامت")]
  HealthCertificate = 9,
  // [Description("پروانه کسب")]
  TradeLicense = 10,
  // [Description("کارت ملی مدیر عامل")]
  CEONationalCard = 11,
  // [Description("اگهی تاسیس")]
  FoundedAd = 12,
}

export enum MSGTypes {
  SaveLocation = 1,
  SaveOrganization = 2
}

export enum DisplayType
{
    // [EnumMember(Value = "Range")]
    Range = 1,
    // [EnumMember(Value = "سانس")]
    Sans = 2
}

export enum EncryptType
{
    // [OriginalName("NAN")]
    Nan = 0,
    // [OriginalName("رمز نگاری")]
    Encrypt = 1,
    // [OriginalName("تایید امضا")]
    Signature = 2,
    // [OriginalName("رمزنگاری tripleDes")]
    TripleDes = 3
}

export enum PatternType
{
    // new
    // [OriginalName("اتوبوسی")]
    Bus = 1,
    // [OriginalName("سینمایی")]
    Cinema = 2,
    // [OriginalName("قدیم")]
    Old = 3
}

export enum ExpireType
{
    // [OriginalName("NotDefind")]
    NotDefind = 0,
    // [OriginalName("ساعتی")]
    Hour = 1,
    // [OriginalName("روزانه")]
    Day = 2
}

export enum ValidationType
{
    // [Display(Name = "مترویی")]
    Metro = 1,
    // [Display(Name = "چند بار مصرف")]
    MultiUse = 2
}

export enum ForGenderList{
    // [Display(Name = "خانم ها")]
    Women = 1,
    // [Display(Name = "آقایان")]
    Men = 2,
    // [Display(Name = "خانم ها و آقایان")]
    MenAndWomen = 3,
    // [Display(Name = "عروس و داماد ها")]
    BrideAndGroom = 4,
    // [Display(Name = "همه موارد")]
    All = 5
}

export enum BaseEntityStatusType
{
    // [Display(Name = "تایید شده")]
    Approved = 1,
    // [Display(Name = "غیرفعال تایید شده")]
    DisabledApproved = 2,
    // [Display(Name = "درحال بررسی")]
    Pending = 3,
    // [Display(Name = "حذف شده")]
    Deleted = 4,
    // [Display(Name = "معلق")]
    Suspended = 5,
}

export enum ServiceType
{
    // [Display(Name = "بلیط")]
    Ticket = 1,
    // [Display(Name = "پوز")]
    Pos = 2
}