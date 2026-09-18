---
id: 756d4252-ea88-4eb7-9817-0aec9b3a77f7
title: '10 Design patterns for FHIR'
slug: design-patterns-for-fhir
description: '10 cách tổ chức mã nguồn khi làm ứng dụng FHIR'
duration_minutes: 20
is_free: true
video_url: null
sort_order: 5
section_title: 'Phần 11: Kiến trúc & Thiết kế (Hands-on)'
course:
  id: 019e3a00-0000-7001-e001-hl7r5000001
  title: 'HL7 FHIR R5 Chuyên Sâu — Reference & Thực hành'
  slug: hl7-fhir-r5-chuyen-sau
---
![10 Design patterns for FHIR](/storage/uploads/hl7-r5/handson/image_2_.webp)

*10 Design patterns for FHIR*

Để xây dựng hệ thống y tế hiệu quả dựa trên FHIR, chúng ta cần áp dụng các mẫu thiết kế phù hợp. Tài liệu này sẽ trình bày 10 mẫu thiết kế quan trọng trong việc xây dựng kiến trúc phần mềm y tế với FHIR, bao gồm:

#### 1. Tổ chức thông tin như thư viện sách (Resource-Oriented Architecture)

Mỗi loại thông tin y tế (bệnh nhân, đơn thuốc, xét nghiệm...) được lưu riêng và có mã số riêng.

```java
// Truy cập tài nguyên Patient thông qua REST API
public Patient getPatientById(String patientId) {
    String serverBase = "http://hapi.fhir.org/baseR4";
    FhirContext ctx = FhirContext.forR4();
    IGenericClient client = ctx.newRestfulGenericClient(serverBase);
    
    // Mỗi tài nguyên có một URL riêng biệt
    Patient patient = client.read()
                            .resource(Patient.class)
                            .withId(patientId)
                            .execute();
    return patient;
}
```

#### 2. Tạo "phiên dịch viên" giữa hệ thống cũ và mới (Adapter Pattern)

```java
// Adapter chuyển đổi từ HL7v2 (cũ) sang FHIR (mới)
public class HL7ToFHIRAdapter {
    public Bundle convertToFHIR(String hl7Message) {
        Bundle result = new Bundle();
        result.setType(Bundle.BundleType.COLLECTION);
        
        try {
            // Phân tích cú pháp HL7
            HapiContext context = new DefaultHapiContext();
            PipeParser parser = context.getPipeParser();
            Message message = parser.parse(hl7Message);
            
            // Lấy thông tin bệnh nhân từ HL7
            ADT_A01 adtMsg = (ADT_A01) message;
            PID pid = adtMsg.getPID();
            
            // Tạo tài nguyên Patient FHIR
            Patient patient = new Patient();
            
            // Thêm họ tên
            HumanName name = new HumanName();
            name.setFamily(pid.getPatientName()[0].getFamilyName().getValue());
            name.addGiven(pid.getPatientName()[0].getGivenName().getValue());
            patient.addName(name);
            
            // Thêm ngày sinh
            Date birthDate = pid.getDateTimeOfBirth().getTimeOfAnEvent().getValueAsDate();
            patient.setBirthDate(birthDate);
            
            // Thêm Patient vào Bundle
            result.addEntry().setResource(patient);
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return result;
    }
}
```

#### 3. Tách riêng nhóm đọc và nhóm ghi dữ liệu (CQRS Pattern)

```java
// Lớp xử lý lệnh (Command) - phần ghi dữ liệu
public class PatientCommandService {
    private IGenericClient client;
    
    public PatientCommandService(IGenericClient client) {
        this.client = client;
    }
    
    // Lệnh tạo bệnh nhân mới
    public String createPatient(Patient patient) {
        MethodOutcome outcome = client.create()
            .resource(patient)
            .execute();
        
        return outcome.getId().getIdPart();
    }
    
    // Lệnh cập nhật bệnh nhân
    public void updatePatient(Patient patient) {
        client.update()
            .resource(patient)
            .execute();
    }
}

// Lớp xử lý truy vấn (Query) - phần đọc dữ liệu
public class PatientQueryService {
    private IGenericClient client;
    
    public PatientQueryService(IGenericClient client) {
        this.client = client;
    }
    
    // Truy vấn tìm bệnh nhân theo ID
    public Patient findById(String id) {
        return client.read()
            .resource(Patient.class)
            .withId(id)
            .execute();
    }
    
    // Truy vấn tìm bệnh nhân theo họ tên
    public List<Patient> findByName(String name) {
        Bundle bundle = client.search()
            .forResource(Patient.class)
            .where(Patient.NAME.matches().value(name))
            .returnBundle(Bundle.class)
            .execute();
        
        List<Patient> patients = new ArrayList<>();
        bundle.getEntry().forEach(entry -> {
            patients.add((Patient) entry.getResource());
        });
        
        return patients;
    }
}
```

#### 4. Tạo "người quản thư" cho dữ liệu (Repository Pattern)

```java
// Giao diện chung cho việc truy cập dữ liệu
public interface PatientRepository {
    Patient findById(String id);
    List<Patient> findByName(String name);
    String save(Patient patient);
    void update(Patient patient);
    void delete(String id);
}

// Triển khai cụ thể sử dụng HAPI FHIR Client
public class HapiFhirPatientRepository implements PatientRepository {
    private IGenericClient client;
    
    public HapiFhirPatientRepository(IGenericClient client) {
        this.client = client;
    }
    
    @Override
    public Patient findById(String id) {
        return client.read()
            .resource(Patient.class)
            .withId(id)
            .execute();
    }
    
    @Override
    public List<Patient> findByName(String name) {
        Bundle bundle = client.search()
            .forResource(Patient.class)
            .where(Patient.NAME.matches().value(name))
            .returnBundle(Bundle.class)
            .execute();
        
        List<Patient> patients = new ArrayList<>();
        bundle.getEntry().forEach(entry -> {
            patients.add((Patient) entry.getResource());
        });
        
        return patients;
    }
    
    @Override
    public String save(Patient patient) {
        MethodOutcome outcome = client.create()
            .resource(patient)
            .execute();
        
        return outcome.getId().getIdPart();
    }
    
    @Override
    public void update(Patient patient) {
        client.update()
            .resource(patient)
            .execute();
    }
    
    @Override
    public void delete(String id) {
        client.delete()
            .resourceById(new IdType("Patient", id))
            .execute();
    }
}
```

#### 5. Cài "chuông báo động" cho dữ liệu quan trọng (Observer/Subscription Pattern)

```java
// Tạo subscription theo dõi huyết áp cao
public Subscription createHighBloodPressureAlert(String patientId) {
    Subscription subscription = new Subscription();
    
    // Thiết lập trạng thái hoạt động
    subscription.setStatus(Subscription.SubscriptionStatus.ACTIVE);
    
    // Lý do theo dõi
    subscription.setReason("Cảnh báo huyết áp cao");
    
    // Tiêu chí - Theo dõi các kết quả huyết áp cao (> 150)
    String criteria = "Observation?code=http://loinc.org|85354-9" + 
                     "&patient=" + patientId + 
                     "&value-quantity=gt150";
    subscription.setCriteria(criteria);
    
    // Thiết lập kênh thông báo - sử dụng webhook
    Subscription.SubscriptionChannelComponent channel = new Subscription.SubscriptionChannelComponent();
    channel.setType(Subscription.SubscriptionChannelType.RESTHOOK);
    channel.setEndpoint("https://hospital-alert-system.com/api/alerts");
    channel.setPayload("application/fhir+json");
    
    subscription.setChannel(channel);
    
    // Lưu subscription vào server
    IGenericClient client = getFhirClient();
    MethodOutcome outcome = client.create()
        .resource(subscription)
        .execute();
    
    return subscription;
}

// Phía nhận thông báo (cài đặt trong Spring Boot)
@RestController
public class AlertController {
    
    @Autowired
    private AlertService alertService;
    
    @PostMapping("/api/alerts")
    public ResponseEntity<String> receiveAlert(@RequestBody String payload) {
        // Xử lý thông báo FHIR
        try {
            FhirContext ctx = FhirContext.forR4();
            IParser parser = ctx.newJsonParser();
            Resource resource = parser.parseResource(payload);
            
            if (resource instanceof Observation) {
                Observation obs = (Observation) resource;
                // Xử lý cảnh báo huyết áp cao
                alertService.processHighBloodPressureAlert(obs);
            }
            
            return ResponseEntity.ok("Alert received and processed");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error processing alert: " + e.getMessage());
        }
    }
}
```

#### 6. Tạo "nút một chạm" cho quy trình phức tạp (Facade Pattern)

```java
// Facade cho quy trình nhập viện
public class PatientAdmissionFacade {
    private IGenericClient fhirClient;
    private PatientRepository patientRepository;
    private EncounterRepository encounterRepository;
    
    public PatientAdmissionFacade(IGenericClient fhirClient) {
        this.fhirClient = fhirClient;
        this.patientRepository = new HapiFhirPatientRepository(fhirClient);
        this.encounterRepository = new HapiFhirEncounterRepository(fhirClient);
    }
    
    // Phương thức nhập viện "một chạm"
    public AdmissionResult admitPatient(PatientAdmissionRequest request) {
        // 1. Tạo transaction bundle để đảm bảo tất cả được lưu hoặc không lưu gì
        Bundle transactionBundle = new Bundle();
        transactionBundle.setType(Bundle.BundleType.TRANSACTION);
        
        // 2. Tạo hoặc cập nhật thông tin bệnh nhân
        Patient patient;
        if (request.getPatientId() != null) {
            patient = patientRepository.findById(request.getPatientId());
            // Cập nhật thông tin nếu cần
        } else {
            // Tạo bệnh nhân mới
            patient = createNewPatient(request);
        }
        
        // Thêm Patient vào transaction
        transactionBundle.addEntry()
            .setResource(patient)
            .getRequest()
            .setMethod(Bundle.HTTPVerb.PUT)
            .setUrl("Patient/" + patient.getIdElement().getIdPart());
        
        // 3. Tạo cuộc gặp (Encounter) cho lần nhập viện
        Encounter encounter = new Encounter();
        encounter.setStatus(Encounter.EncounterStatus.INPROGRESS);
        encounter.setClass_(new Coding("http://terminology.hl7.org/CodeSystem/v3-ActCode", "IMP", "inpatient encounter"));
        
        // Liên kết với bệnh nhân
        encounter.setSubject(new Reference("Patient/" + patient.getIdElement().getIdPart()));
        
        // Thiết lập thời gian nhập viện
        Period period = new Period();
        period.setStart(new Date());
        encounter.setPeriod(period);
        
        // Thêm Encounter vào transaction
        transactionBundle.addEntry()
            .setResource(encounter)
            .getRequest()
            .setMethod(Bundle.HTTPVerb.POST)
            .setUrl("Encounter");
        
        // 4. Thực hiện transaction
        Bundle resultBundle = fhirClient.transaction()
            .withBundle(transactionBundle)
            .execute();
        
        // 5. Xử lý kết quả và trả về
        AdmissionResult result = new AdmissionResult();
        result.setSuccess(true);
        
        // Lấy ID của bệnh nhân và cuộc gặp từ kết quả
        for (Bundle.BundleEntryComponent entry : resultBundle.getEntry()) {
            if (entry.getResource() instanceof Patient) {
                result.setPatientId(entry.getResource().getIdElement().getIdPart());
            } else if (entry.getResource() instanceof Encounter) {
                result.setEncounterId(entry.getResource().getIdElement().getIdPart());
            }
        }
        
        return result;
    }
    
    private Patient createNewPatient(PatientAdmissionRequest request) {
        Patient patient = new Patient();
        
        // Thiết lập thông tin cá nhân
        HumanName name = new HumanName();
        name.setFamily(request.getLastName());
        name.addGiven(request.getFirstName());
        patient.addName(name);
        
        // Thiết lập ngày sinh
        patient.setBirthDate(request.getBirthDate());
        
        // Thiết lập giới tính
        if (request.getGender() != null) {
            patient.setGender(Enumerations.AdministrativeGender.valueOf(request.getGender().toUpperCase()));
        }
        
        return patient;
    }
}
```

#### 7. Gom nhóm thông tin liên quan thành bộ (Composite Pattern)

```java
// Lớp đại diện cho một tài liệu lâm sàng
public class ClinicalDocument {
    private Composition composition;
    private List<DocumentSection> sections = new ArrayList<>();
    
    public ClinicalDocument(String title, String patientId) {
        // Tạo composition là tài nguyên chính của tài liệu
        composition = new Composition();
        composition.setTitle(title);
        composition.setStatus(Composition.CompositionStatus.FINAL);
        composition.setDate(new Date());
        composition.setSubject(new Reference("Patient/" + patientId));
        
        // Thiết lập tác giả
        composition.addAuthor(new Reference("Practitioner/example"));
    }
    
    // Thêm phần mới vào tài liệu
    public void addSection(String title, String text, List<Resource> entries) {
        // Tạo phần mới trong composition
        Composition.SectionComponent section = composition.addSection();
        section.setTitle(title);
        
        // Thêm nội dung văn bản
        Narrative narrative = new Narrative();
        narrative.setStatus(Narrative.NarrativeStatus.GENERATED);
        narrative.setDivAsString("<div xmlns=\"http://www.w3.org/1999/xhtml\">" + text + "</div>");
        section.setText(narrative);
        
        // Thêm các tham chiếu đến tài nguyên liên quan
        for (Resource resource : entries) {
            section.addEntry(new Reference(resource.getIdElement().getValue()));
        }
        
        // Lưu thông tin phần và các mục liên quan
        DocumentSection docSection = new DocumentSection();
        docSection.setSection(section);
        docSection.setEntries(entries);
        sections.add(docSection);
    }
    
    // Đóng gói tất cả vào một Bundle để lưu trữ
    public Bundle generateBundle() {
        Bundle bundle = new Bundle();
        bundle.setType(Bundle.BundleType.DOCUMENT);
        
        // Thêm composition làm phần chính của tài liệu
        bundle.addEntry().setResource(composition);
        
        // Thêm tất cả các tài nguyên liên quan
        for (DocumentSection section : sections) {
            for (Resource resource : section.getEntries()) {
                bundle.addEntry().setResource(resource);
            }
        }
        
        return bundle;
    }
    
    // Lớp giúp theo dõi các phần của tài liệu
    public static class DocumentSection {
        private Composition.SectionComponent section;
        private List<Resource> entries;
        
        public Composition.SectionComponent getSection() {
            return section;
        }
        
        public void setSection(Composition.SectionComponent section) {
            this.section = section;
        }
        
        public List<Resource> getEntries() {
            return entries;
        }
        
        public void setEntries(List<Resource> entries) {
            this.entries = entries;
        }
    }
}

// Sử dụng tài liệu lâm sàng
public void createDischargeDocument(String patientId) {
    // Tạo tài liệu xuất viện
    ClinicalDocument dischargeSummary = new ClinicalDocument("Discharge Summary", patientId);
    
    // Thêm phần lý do nhập viện
    List<Resource> admissionResources = new ArrayList<>();
    Condition condition = new Condition();
    condition.setSubject(new Reference("Patient/" + patientId));
    condition.setCode(new CodeableConcept().addCoding(
        new Coding("http://snomed.info/sct", "389586006", "Hypertension")
    ));
    condition.setClinicalStatus(new CodeableConcept().addCoding(
        new Coding("http://terminology.hl7.org/CodeSystem/condition-clinical", "active", "Active")
    ));
    admissionResources.add(condition);
    
    dischargeSummary.addSection(
        "Lý do nhập viện", 
        "Bệnh nhân được nhập viện do tình trạng tăng huyết áp không kiểm soát.", 
        admissionResources
    );
    
    // Thêm phần kết quả xét nghiệm
    List<Resource> labResults = new ArrayList<>();
    // Tạo kết quả xét nghiệm
    Observation bloodPressure = new Observation();
    bloodPressure.setStatus(Observation.ObservationStatus.FINAL);
    bloodPressure.setCode(new CodeableConcept().addCoding(
        new Coding("http://loinc.org", "85354-9", "Blood pressure")
    ));
    bloodPressure.setSubject(new Reference("Patient/" + patientId));
    
    // Thêm kết quả vào phần
    labResults.add(bloodPressure);
    
    dischargeSummary.addSection(
        "Kết quả xét nghiệm",
        "Huyết áp: 160/95 mmHg",
        labResults
    );
    
    // Tạo bundle chứa toàn bộ tài liệu
    Bundle documentBundle = dischargeSummary.generateBundle();
    
    // Lưu tài liệu vào hệ thống
    IGenericClient client = getFhirClient();
    client.create().resource(documentBundle).execute();
}
```

#### 8. Tạo "bộ kiểm tra" trước khi lưu dữ liệu (Validator Pattern)

```java
// Giao diện cho validator
public interface ResourceValidator<T extends Resource> {
    ValidationResult validate(T resource);
}

// Validator cho tài nguyên Patient
public class PatientValidator implements ResourceValidator<Patient> {
    private FhirContext fhirContext;
    private IValidationSupport validationSupport;
    
    public PatientValidator(FhirContext fhirContext) {
        this.fhirContext = fhirContext;
        // Thiết lập hỗ trợ kiểm tra
        this.validationSupport = new DefaultProfileValidationSupport(fhirContext);
    }
    
    @Override
    public ValidationResult validate(Patient patient) {
        ValidationResult result = new ValidationResult();
        
        // 1. Kiểm tra cấu trúc (tuân thủ định nghĩa FHIR)
        FhirValidator validator = fhirContext.newValidator();
        validator.registerValidatorModule(new FhirInstanceValidator(validationSupport));
        
        ValidationResult structuralResult = structuralValidation(validator, patient);
        if (!structuralResult.isValid()) {
            return structuralResult;
        }
        
        // 2. Kiểm tra nghiệp vụ
        
        // Kiểm tra ngày sinh không trong tương lai
        if (patient.hasBirthDate() && patient.getBirthDate().after(new Date())) {
            result.addError("Ngày sinh không thể là ngày trong tương lai");
        }
        
        // Kiểm tra tuổi bệnh nhân không âm
        if (patient.hasBirthDate()) {
            Calendar dob = Calendar.getInstance();
            dob.setTime(patient.getBirthDate());
            Calendar today = Calendar.getInstance();
            
            int age = today.get(Calendar.YEAR) - dob.get(Calendar.YEAR);
            if (today.get(Calendar.DAY_OF_YEAR) < dob.get(Calendar.DAY_OF_YEAR)) {
                age--;
            }
            
            if (age < 0) {
                result.addError("Tuổi bệnh nhân không thể là số âm");
            }
        }
        
        // Kiểm tra tên bệnh nhân được cung cấp
        if (!patient.hasName() || patient.getName().isEmpty()) {
            result.addError("Tên bệnh nhân là bắt buộc");
        } else {
            HumanName name = patient.getNameFirstRep();
            if (!name.hasFamily() || name.getFamily().trim().isEmpty()) {
                result.addError("Họ bệnh nhân là bắt buộc");
            }
        }
        
        return result;
    }
    
    private ValidationResult structuralValidation(FhirValidator validator, Patient patient) {
        ValidationResult result = new ValidationResult();
        
        ValidationResult validationResult = new ValidationResult();
        org.hl7.fhir.r4.model.ValidationResult outcomes = validator.validateWithResult(patient);
        
        // Chuyển đổi kết quả
        if (!outcomes.isSuccessful()) {
            for (SingleValidationMessage message : outcomes.getMessages()) {
                if (message.getSeverity() == ValidationMessage.IssueSeverity.ERROR || 
                    message.getSeverity() == ValidationMessage.IssueSeverity.FATAL) {
                    result.addError(message.getMessage());
                } else if (message.getSeverity() == ValidationMessage.IssueSeverity.WARNING) {
                    result.addWarning(message.getMessage());
                }
            }
        }
        
        return result;
    }
    
    // Lớp giúp quản lý kết quả kiểm tra
    public static class ValidationResult {
        private List<String> errors = new ArrayList<>();
        private List<String> warnings = new ArrayList<>();
        
        public boolean isValid() {
            return errors.isEmpty();
        }
        
        public void addError(String message) {
            errors.add(message);
        }
        
        public void addWarning(String message) {
            warnings.add(message);
        }
        
        public List<String> getErrors() {
            return errors;
        }
        
        public List<String> getWarnings() {
            return warnings;
        }
    }
}

// Sử dụng validator
public void savePatientWithValidation(Patient patient) {
    FhirContext ctx = FhirContext.forR4();
    PatientValidator validator = new PatientValidator(ctx);
    
    // Kiểm tra tài nguyên trước khi lưu
    ValidationResult result = validator.validate(patient);
    
    if (result.isValid()) {
        // Tài nguyên hợp lệ, tiến hành lưu
        IGenericClient client = ctx.newRestfulGenericClient("http://hapi.fhir.org/baseR4");
        client.create().resource(patient).execute();
    } else {
        // Xử lý lỗi
        System.err.println("Không thể lưu bệnh nhân do các lỗi sau:");
        for (String error : result.getErrors()) {
            System.err.println(" - " + error);
        }
    }
}
```

#### 9. Lưu tạm thông tin thường dùng để truy cập nhanh (Cache Pattern)

```java
// Repository có sử dụng cache
public class CachedFhirRepository<T extends Resource> implements ResourceRepository<T> {
    private Class<T> resourceType;
    private IGenericClient client;
    private Map<String, CacheEntry<T>> cache = new ConcurrentHashMap<>();
    private long cacheTimeoutMs = 300000; // 5 phút
    
    public CachedFhirRepository(Class<T> resourceType, IGenericClient client) {
        this.resourceType = resourceType;
        this.client = client;
    }
    
    @Override
    public T findById(String id) {
        // Kiểm tra cache trước
        CacheEntry<T> cachedEntry = cache.get(id);
        if (cachedEntry != null && !cachedEntry.isExpired()) {
            return cachedEntry.getResource();
        }
        
        // Không có trong cache hoặc đã hết hạn, lấy từ server
        T resource = client.read()
                           .resource(resourceType)
                           .withId(id)
                           .execute();
        
        // Lưu vào cache
        cache.put(id, new CacheEntry<>(resource, System.currentTimeMillis() + cacheTimeoutMs));
        
        return resource;
    }
    
    @Override
    public String save(T resource) {
        MethodOutcome outcome = client.create()
                                     .resource(resource)
                                     .execute();
        
        String id = outcome.getId().getIdPart();
        
        // Cập nhật cache
        cache.put(id, new CacheEntry<>(resource, System.currentTimeMillis() + cacheTimeoutMs));
        
        return id;
    }
    
    @Override
    public void update(T resource) {
        client.update()
             .resource(resource)
             .execute();
        
        // Cập nhật cache
        String id = resource.getIdElement().getIdPart();
        cache.put(id, new CacheEntry<>(resource, System.currentTimeMillis() + cacheTimeoutMs));
    }
    
    @Override
    public void delete(String id) {
        client.delete()
             .resourceById(new IdType(resourceType.getSimpleName(), id))
             .execute();
        
        // Xóa khỏi cache
        cache.remove(id);
    }
    
    // Xóa cache cho tài nguyên cụ thể
    public void invalidateCache(String id) {
        cache.remove(id);
    }
    
    // Xóa tất cả cache
    public void clearCache() {
        cache.clear();
    }
    
    // Lớp để theo dõi mục trong cache
    private static class CacheEntry<T> {
        private T resource;
        private long expirationTime;
        
        public CacheEntry(T resource, long expirationTime) {
            this.resource = resource;
            this.expirationTime = expirationTime;
        }
        
        public T getResource() {
            return resource;
        }
        
        public boolean isExpired() {
            return System.currentTimeMillis() > expirationTime;
        }
    }
}

// Định nghĩa giao diện repository
public interface ResourceRepository<T extends Resource> {
    T findById(String id);
    String save(T resource);
    void update(T resource);
    void delete(String id);
}

// Sử dụng cached repository
public void useValueSetCache() {
    FhirContext ctx = FhirContext.forR4();
    IGenericClient client = ctx.newRestfulGenericClient("http://hapi.fhir.org/baseR4");
    
    // Tạo repository có cache cho ValueSet
    CachedFhirRepository<ValueSet> valueSetRepository = 
        new CachedFhirRepository<>(ValueSet.class, client);
    
    // Lấy ValueSet từ server (hoặc cache nếu đã có)
    ValueSet medicationFormValueSet = valueSetRepository.findById("medication-form");
    
    // Sử dụng ValueSet
    // ...
    
    // Các lần gọi tiếp theo sẽ nhanh hơn vì lấy từ cache
    medicationFormValueSet = valueSetRepository.findById("medication-form");
}
```

#### 10. Xử lý hàng loạt thay vì từng cái một (Bulk Operation Pattern)

```java
// Lớp xử lý dữ liệu hàng loạt
public class BulkDataProcessor {
    private IGenericClient client;
    private String serverUrl;
    
    public BulkDataProcessor(String serverUrl) {
        this.serverUrl = serverUrl;
        FhirContext ctx = FhirContext.forR4();
        this.client = ctx.newRestfulGenericClient(serverUrl);
    }
    
// Phương thức xuất dữ liệu bệnh nhân hàng loạt 
public BulkExportResult exportPatientData(String criteria) throws IOException, InterruptedException {
   // Bắt đầu quá trình xuất với $export
   String exportUrl = serverUrl + "/$export?_type=Patient,Observation,MedicationRequest";
   if (criteria != null && !criteria.isEmpty()) {
       exportUrl += "&_typeFilter=Patient?" + criteria;
   }
   
   // Gửi yêu cầu xuất
   HttpClient httpClient = HttpClients.createDefault();
   HttpGet exportRequest = new HttpGet(exportUrl);
   exportRequest.addHeader("Accept", "application/fhir+json");
   exportRequest.addHeader("Prefer", "respond-async");
   
   HttpResponse response = httpClient.execute(exportRequest);
   
   // Kiểm tra phản hồi - nếu thành công sẽ nhận được 202 Accepted
   if (response.getStatusLine().getStatusCode() != 202) {
       throw new IOException("Không thể bắt đầu xuất dữ liệu: " + response.getStatusLine());
   }
   
   // Lấy URL theo dõi tiến trình
   String contentLocation = response.getFirstHeader("Content-Location").getValue();
   
   // Theo dõi trạng thái xuất
   boolean completed = false;
   int maxRetries = 10;
   int retryCount = 0;
   
   while (!completed && retryCount < maxRetries) {
       // Chờ một chút trước khi kiểm tra trạng thái
       Thread.sleep(5000);
       
       HttpGet statusRequest = new HttpGet(contentLocation);
       statusRequest.addHeader("Accept", "application/fhir+json");
       
       HttpResponse statusResponse = httpClient.execute(statusRequest);
       int statusCode = statusResponse.getStatusLine().getStatusCode();
       
       if (statusCode == 202) {
           // Vẫn đang xử lý
           retryCount++;
       } else if (statusCode == 200) {
           // Xuất thành công
           completed = true;
           
           // Phân tích kết quả
           String responseContent = EntityUtils.toString(statusResponse.getEntity());
           ObjectMapper mapper = new ObjectMapper();
           JsonNode root = mapper.readTree(responseContent);
           
           // Tạo đối tượng kết quả
           BulkExportResult result = new BulkExportResult();
           
           // Lấy các URL tải xuống
           JsonNode output = root.get("output");
           if (output != null && output.isArray()) {
               for (JsonNode file : output) {
                   String type = file.get("type").asText();
                   String url = file.get("url").asText();
                   
                   // Thêm thông tin tệp vào kết quả
                   result.addFile(type, url);
               }
           }
           
           return result;
       } else {
           // Có lỗi xảy ra
           throw new IOException("Lỗi khi kiểm tra trạng thái xuất: " + statusResponse.getStatusLine());
       }
   }
   
   throw new IOException("Hết thời gian chờ xuất dữ liệu");
}

// Lớp để lưu kết quả xuất hàng loạt
public class BulkExportResult {
   private List<ExportedFile> files = new ArrayList<>();
   private Date exportTime = new Date();
   
   public void addFile(String resourceType, String downloadUrl) {
       files.add(new ExportedFile(resourceType, downloadUrl));
   }
   
   public List<ExportedFile> getFiles() {
       return files;
   }
   
   public Date getExportTime() {
       return exportTime;
   }
   
   // Lớp chứa thông tin về tệp xuất
   public static class ExportedFile {
       private String resourceType;
       private String downloadUrl;
       
       public ExportedFile(String resourceType, String downloadUrl) {
           this.resourceType = resourceType;
           this.downloadUrl = downloadUrl;
       }
       
       public String getResourceType() {
           return resourceType;
       }
       
       public String getDownloadUrl() {
           return downloadUrl;
       }
   }
}

// Phương thức xử lý dữ liệu đã xuất
public void processExportedData(BulkExportResult exportResult) throws IOException {
   HttpClient httpClient = HttpClients.createDefault();
   FhirContext ctx = FhirContext.forR4();
   IParser parser = ctx.newJsonParser();
   
   for (BulkExportResult.ExportedFile file : exportResult.getFiles()) {
       System.out.println("Đang xử lý tệp " + file.getResourceType() + "...");
       
       // Tải tệp
       HttpGet downloadRequest = new HttpGet(file.getDownloadUrl());
       HttpResponse response = httpClient.execute(downloadRequest);
       
       // Đọc nội dung tệp
       try (InputStream is = response.getEntity().getContent();
            BufferedReader reader = new BufferedReader(new InputStreamReader(is))) {
           
           String line;
           int count = 0;
           
           // Xử lý từng tài nguyên FHIR (mỗi dòng là một tài nguyên JSON)
           while ((line = reader.readLine()) != null) {
               // Phân tích tài nguyên
               Resource resource = parser.parseResource(line);
               
               // Xử lý tài nguyên theo loại
               if (resource instanceof Patient) {
                   processPatient((Patient) resource);
               } else if (resource instanceof Observation) {
                   processObservation((Observation) resource);
               } else if (resource instanceof MedicationRequest) {
                   processMedicationRequest((MedicationRequest) resource);
               }
               
               count++;
               
               // In tiến trình sau mỗi 100 tài nguyên
               if (count % 100 == 0) {
                   System.out.println("Đã xử lý " + count + " tài nguyên " + file.getResourceType());
               }
           }
           
           System.out.println("Hoàn thành xử lý " + count + " tài nguyên " + file.getResourceType());
       }
   }
}

// Các phương thức xử lý riêng cho từng loại tài nguyên
private void processPatient(Patient patient) {
   // Xử lý dữ liệu bệnh nhân
   // Ví dụ: tính tuổi trung bình, phân tích phân bố giới tính, v.v.
}

private void processObservation(Observation observation) {
   // Xử lý dữ liệu quan sát
   // Ví dụ: phân tích xu hướng kết quả xét nghiệm, tìm giá trị bất thường, v.v.
}

private void processMedicationRequest(MedicationRequest medicationRequest) {
   // Xử lý dữ liệu đơn thuốc
   // Ví dụ: phân tích mẫu kê đơn, tìm tương tác thuốc, v.v.
}
```

### Kết luận: Tìm hiểu các mẫu thiết kế qua ví dụ thực tế

Các mẫu thiết kế FHIR được trình bày với code Java ở trên có thể giúp bạn:

1. **Tổ chức mã nguồn** tốt hơn, dễ đọc và dễ bảo trì
2. **Tương tác hiệu quả** với máy chủ FHIR
3. **Xử lý dữ liệu y tế** một cách an toàn và hiệu quả

Bạn không cần áp dụng tất cả các mẫu cùng lúc. Hãy bắt đầu với một số mẫu cơ bản như Resource-Oriented Architecture và Repository Pattern, sau đó từng bước áp dụng các mẫu khác khi dự án của bạn phát triển.

Mỗi mẫu thiết kế giải quyết một vấn đề cụ thể:

* **Adapter Pattern**: Kết nối hệ thống cũ và mới
* **CQRS Pattern**: Tối ưu hiệu suất đọc/ghi
* **Repository Pattern**: Đơn giản hóa truy cập dữ liệu
* **Observer Pattern**: Phản ứng kịp thời với thay đổi
* **Facade Pattern**: Đơn giản hóa quy trình phức tạp
* **Composite Pattern**: Quản lý tài nguyên liên quan
* **Validator Pattern**: Đảm bảo chất lượng dữ liệu
* **Cache Pattern**: Tăng tốc độ truy cập dữ liệu
* **Bulk Operation Pattern**: Xử lý dữ liệu lớn hiệu quả

Với những mẫu thiết kế này, bạn có thể xây dựng ứng dụng FHIR có hiệu suất cao, dễ bảo trì và mở rộng để đáp ứng nhu cầu ngày càng tăng của hệ thống y tế hiện đại.
