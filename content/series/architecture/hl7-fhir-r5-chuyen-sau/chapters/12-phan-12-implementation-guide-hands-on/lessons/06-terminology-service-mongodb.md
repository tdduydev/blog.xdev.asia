---
id: 7263ef8f-d321-47bc-8991-059d4545e545
title: 'Terminology Service'
slug: terminology-service-mongodb
description: 'Xây dựng Terminology Service cho Hệ thống Y tế FHIR R5 với MongoDB'
duration_minutes: 26
is_free: true
video_url: null
sort_order: 6
section_title: 'Phần 12: Implementation Guide (Hands-on)'
course:
  id: 019e3a00-0000-7001-e001-hl7r5000001
  title: 'HL7 FHIR R5 Chuyên Sâu — Reference & Thực hành'
  slug: hl7-fhir-r5-chuyen-sau
---
Trong một hệ thống y tế dựa trên HL7 FHIR R5, **Terminology Service** đóng vai trò quan trọng trong việc cung cấp và quản lý các hệ thống mã hóa (coding systems) và thuật ngữ chuẩn hóa. Service này giúp đảm bảo tính nhất quán của dữ liệu, hỗ trợ việc tìm kiếm và báo cáo, đồng thời tạo điều kiện cho khả năng tương tác giữa các hệ thống khác nhau.

Trong bài viết này, tôi sẽ chia sẻ cách thiết kế và triển khai một Terminology Service hiện đại sử dụng Spring Boot, MongoDB, Keycloak, Spring Cloud Config Server và Netflix Eureka.

### Giới thiệu về Terminology Service

Terminology Service cung cấp khả năng truy vấn, quản lý và sử dụng các bộ mã và thuật ngữ y tế chuẩn hóa như:

* **SNOMED CT**: Thuật ngữ lâm sàng
* **LOINC**: Mã xét nghiệm và quan sát
* **ICD-10/ICD-11**: Phân loại bệnh quốc tế
* **RxNorm**: Thuật ngữ dược phẩm
* **UCUM**: Đơn vị đo lường

Service này hỗ trợ các hoạt động như:

* Tra cứu mã (code lookup)
* Xác thực mã (validation)
* Ánh xạ giữa các hệ thống mã (mapping)
* Mở rộng giá trị (value set expansion)
* Tìm kiếm khái niệm (concept search)

### Kiến trúc Tổng quan

![Terminology Service Architecture](/storage/uploads/hl7-r5/handson/image_3_1_.webp)

*Terminology Service Architecture*

Terminology Service của chúng ta được thiết kế với các thành phần chính sau:

1. **API Layer**: RESTful API tuân thủ FHIR R5 terminology operations
2. **Service Layer**: Logic nghiệp vụ cho các hoạt động terminology
3. **Data Access Layer**: Tương tác với MongoDB
4. **Security Layer**: Tích hợp với Keycloak
5. **Discovery & Configuration**: Tích hợp với Eureka và Config Server

### Thiết lập Project

#### Cấu trúc Project

```
terminology-service/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── healthcare/
│   │   │           └── terminology/
│   │   │               ├── TerminologyServiceApplication.java
│   │   │               ├── config/
│   │   │               ├── controller/
│   │   │               ├── exception/
│   │   │               ├── model/
│   │   │               ├── repository/
│   │   │               └── service/
│   │   └── resources/
│   │       ├── application.yml
│   │       └── bootstrap.yml
│   └── test/
├── Dockerfile
└── pom.xml
```

#### Cấu hình Maven (pom.xml)

```xml
    <dependencies>
        <!-- Spring Boot -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-mongodb</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        
        <!-- Spring Cloud -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-config</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        
        <!-- Security with Keycloak -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        
        <!-- HAPI FHIR for FHIR R5 -->
        <dependency>
            <groupId>ca.uhn.hapi.fhir</groupId>
            <artifactId>hapi-fhir-base</artifactId>
            <version>${hapi-fhir.version}</version>
        </dependency>
        <dependency>
            <groupId>ca.uhn.hapi.fhir</groupId>
            <artifactId>hapi-fhir-structures-r5</artifactId>
            <version>${hapi-fhir.version}</version>
        </dependency>
        
        <!-- Testing -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        
        <!-- Utilities -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
    </dependencies>
```

#### Cấu hình Bootstrap và Application

**bootstrap.yml** (Cấu hình ban đầu cho Cloud Config)

```yaml
spring:
  application:
    name: terminology-service
  cloud:
    config:
      uri: http://${CONFIG_SERVER_HOST:localhost}:${CONFIG_SERVER_PORT:8888}
      fail-fast: true
      retry:
        max-attempts: 6
        initial-interval: 1000
        max-interval: 2000
        multiplier: 1.1
```

**application.yml** (Cấu hình ứng dụng mặc định)

```yaml
server:
  port: 8301

spring:
  data:
    mongodb:
      uri: mongodb://${MONGODB_HOST:localhost}:${MONGODB_PORT:27017}/terminology
  
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: ${KEYCLOAK_URL:http://localhost:8180}/realms/healthcare
          jwk-set-uri: ${KEYCLOAK_URL:http://localhost:8180}/realms/healthcare/protocol/openid-connect/certs

eureka:
  client:
    service-url:
      defaultZone: http://${EUREKA_HOST:localhost}:${EUREKA_PORT:8761}/eureka/
  instance:
    prefer-ip-address: true
    instance-id: ${spring.application.name}:${server.port}:${random.uuid}

management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  health:
    mongo:
      enabled: true

logging:
  level:
    com.healthcare.terminology: DEBUG
    org.springframework.web: INFO
    org.springframework.data.mongodb: INFO

# Terminology service specific configs
terminology:
  refresh-schedule: "0 0 0 * * ?"  # Daily at midnight
  supported-code-systems:
    - name: "SNOMED CT"
      uri: "http://snomed.info/sct"
      version: "http://snomed.info/sct/900000000000207008/version/20230301"
    - name: "LOINC"
      uri: "http://loinc.org"
      version: "2.74"
    - name: "ICD-10"
      uri: "http://hl7.org/fhir/sid/icd-10"
      version: "2023"
    - name: "RxNorm"
      uri: "http://www.nlm.nih.gov/research/umls/rxnorm"
      version: "202302"
```

### Mô hình Dữ liệu MongoDB

Chúng ta sẽ thiết kế các collections MongoDB để quản lý các FHIR terminology resources như CodeSystem, ValueSet, ConceptMap và hỗ trợ các thao tác tìm kiếm hiệu quả.

#### Code System Model

```java
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@Document(collection = "code_systems")
@CompoundIndexes({
    @CompoundIndex(name = "uri_version", def = "{'uri': 1, 'version': 1}", unique = true)
})
public class CodeSystem {
    
    @Id
    private String id;
    
    @Indexed
    private String name;
    
    @Indexed(unique = true)
    private String uri;
    
    private String version;
    private String publisher;
    private String description;
    private String purpose;
    private String copyright;
    private LocalDateTime lastUpdated;
    private String status;
    private String valueSet;
    private String hierarchyMeaning;
    private List<Property> property = new ArrayList<>();
    private List<Concept> concept = new ArrayList<>();
    
    @Data
    public static class Property {
        private String code;
        private String uri;
        private String description;
        private String type;
    }
    
    @Data
    public static class Concept {
        private String code;
        
        @Indexed
        private String display;
        
        private String definition;
        private String designation;
        private List<ConceptProperty> property = new ArrayList<>();
        private List<Concept> concept = new ArrayList<>();
    }
    
    @Data
    public static class ConceptProperty {
        private String code;
        private String value;  // Could be different types depending on property.type
    }
}
```

#### Value Set Model

```java
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "value_sets")
@CompoundIndexes({
    @CompoundIndex(name = "uri_version", def = "{'uri': 1, 'version': 1}", unique = true)
})
public class ValueSet {
    
    @Id
    private String id;
    
    @Indexed
    private String name;
    
    @Indexed(unique = true)
    private String uri;
    
    private String version;
    private String publisher;
    private String description;
    private String purpose;
    private String copyright;
    private LocalDateTime lastUpdated;
    private String status;
    private Compose compose;
    private Expansion expansion;
    
    @Data
    public static class Compose {
        private LocalDateTime lockedDate;
        private Boolean inactive;
        private List<Include> include = new ArrayList<>();
        private List<Include> exclude = new ArrayList<>();
    }
    
    @Data
    public static class Include {
        private String system;
        private String version;
        private List<ValueSetConcept> concept = new ArrayList<>();
        private List<Filter> filter = new ArrayList<>();
        private List<String> valueSet = new ArrayList<>();
    }
    
    @Data
    public static class ValueSetConcept {
        private String code;
        private String display;
        private List<Designation> designation = new ArrayList<>();
    }
    
    @Data
    public static class Designation {
        private String language;
        private String use;
        private String value;
    }
    
    @Data
    public static class Filter {
        private String property;
        private String op;
        private String value;
    }
    
    @Data
    public static class Expansion {
        private String identifier;
        private LocalDateTime timestamp;
        private Integer total;
        private Integer offset;
        private List<Parameter> parameter = new ArrayList<>();
        private List<Contains> contains = new ArrayList<>();
    }
    
    @Data
    public static class Parameter {
        private String name;
        private String value;
    }
    
    @Data
    public static class Contains {
        private String system;
        private String version;
        private String code;
        private String display;
        private Boolean inactive;
        private List<Designation> designation = new ArrayList<>();
        private List<Contains> contains = new ArrayList<>();
    }
}
```

#### Concept Map Model

```java

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "concept_maps")
@CompoundIndexes({
    @CompoundIndex(name = "uri_version", def = "{'uri': 1, 'version': 1}", unique = true),
    @CompoundIndex(name = "source_target", def = "{'sourceUri': 1, 'targetUri': 1}")
})
public class ConceptMap {
    
    @Id
    private String id;
    
    @Indexed
    private String name;
    
    @Indexed(unique = true)
    private String uri;
    
    private String version;
    private String publisher;
    private String description;
    private String purpose;
    private String copyright;
    private LocalDateTime lastUpdated;
    private String status;
    
    @Indexed
    private String sourceUri;
    
    private String sourceVersion;
    
    @Indexed
    private String targetUri;
    
    private String targetVersion;
    private List<Group> group = new ArrayList<>();
    
    @Data
    public static class Group {
        private String source;
        private String sourceVersion;
        private String target;
        private String targetVersion;
        private List<Element> element = new ArrayList<>();
    }
    
    @Data
    public static class Element {
        private String code;
        private String display;
        private List<Target> target = new ArrayList<>();
    }
    
    @Data
    public static class Target {
        private String code;
        private String display;
        private String equivalence;
        private String comment;
        private List<DependsOn> dependsOn = new ArrayList<>();
        private List<Product> product = new ArrayList<>();
    }
    
    @Data
    public static class DependsOn {
        private String property;
        private String system;
        private String value;
        private String display;
    }
    
    @Data
    public static class Product {
        private String property;
        private String system;
        private String value;
        private String display;
    }
}
```

### Repositories

Tạo các repositories để tương tác với MongoDB:

```java

import com.healthcare.terminology.model.CodeSystem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CodeSystemRepository extends MongoRepository<CodeSystem, String> {
    
    Optional<CodeSystem> findByUriAndVersion(String uri, String version);
    
    Optional<CodeSystem> findByUri(String uri);
    
    @Query("{'concept.code': ?0, 'uri': ?1}")
    Optional<CodeSystem> findByCodeAndSystem(String code, String system);
    
    List<CodeSystem> findByNameContainingIgnoreCase(String name);
}
```

```java

import com.healthcare.terminology.model.ValueSet;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ValueSetRepository extends MongoRepository<ValueSet, String> {
    
    Optional<ValueSet> findByUriAndVersion(String uri, String version);
    
    Optional<ValueSet> findByUri(String uri);
    
    List<ValueSet> findByNameContainingIgnoreCase(String name);
}
```

```java
package com.healthcare.terminology.repository;

import com.healthcare.terminology.model.ConceptMap;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ConceptMapRepository extends MongoRepository<ConceptMap, String> {
    
    Optional<ConceptMap> findByUriAndVersion(String uri, String version);
    
    Optional<ConceptMap> findByUri(String uri);
    
    List<ConceptMap> findBySourceUriAndTargetUri(String sourceUri, String targetUri);
    
    List<ConceptMap> findBySourceUri(String sourceUri);
    
    List<ConceptMap> findByTargetUri(String targetUri);
}
```

### Services

Triển khai các services chính:

#### CodeSystem Service

```java

import com.healthcare.terminology.exception.ResourceNotFoundException;
import com.healthcare.terminology.model.CodeSystem;
import com.healthcare.terminology.repository.CodeSystemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CodeSystemService {
    
    private final CodeSystemRepository codeSystemRepository;
    
    public List<CodeSystem> findAll() {
        return codeSystemRepository.findAll();
    }
    
    public CodeSystem findById(String id) {
        return codeSystemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CodeSystem not found with id: " + id));
    }
    
    public CodeSystem findByUri(String uri) {
        return codeSystemRepository.findByUri(uri)
                .orElseThrow(() -> new ResourceNotFoundException("CodeSystem not found with uri: " + uri));
    }
    
    public CodeSystem findByUriAndVersion(String uri, String version) {
        return codeSystemRepository.findByUriAndVersion(uri, version)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "CodeSystem not found with uri: " + uri + " and version: " + version));
    }
    
    public CodeSystem save(CodeSystem codeSystem) {
        codeSystem.setLastUpdated(LocalDateTime.now());
        return codeSystemRepository.save(codeSystem);
    }
    
    public void delete(String id) {
        codeSystemRepository.deleteById(id);
    }
    
    public List<CodeSystem> search(String query) {
        return codeSystemRepository.findByNameContainingIgnoreCase(query);
    }
    
    public boolean validateCode(String system, String code) {
        return codeSystemRepository.findByCodeAndSystem(code, system).isPresent();
    }
    
    public Optional<CodeSystem.Concept> lookupCode(String system, String code) {
        Optional<CodeSystem> codeSystem = codeSystemRepository.findByCodeAndSystem(code, system);
        
        if (codeSystem.isEmpty()) {
            return Optional.empty();
        }
        
        return findConceptInHierarchy(codeSystem.get().getConcept(), code);
    }
    
    private Optional<CodeSystem.Concept> findConceptInHierarchy(List<CodeSystem.Concept> concepts, String code) {
        if (concepts == null || concepts.isEmpty()) {
            return Optional.empty();
        }
        
        for (CodeSystem.Concept concept : concepts) {
            if (concept.getCode().equals(code)) {
                return Optional.of(concept);
            }
            
            Optional<CodeSystem.Concept> found = findConceptInHierarchy(concept.getConcept(), code);
            if (found.isPresent()) {
                return found;
            }
        }
        
        return Optional.empty();
    }
}
```

#### ValueSet Service

```java
import com.healthcare.terminology.exception.ResourceNotFoundException;
import com.healthcare.terminology.model.CodeSystem;
import com.healthcare.terminology.model.ValueSet;
import com.healthcare.terminology.repository.ValueSetRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ValueSetService {
    
    private final ValueSetRepository valueSetRepository;
    private final CodeSystemService codeSystemService;
    
    public List<ValueSet> findAll() {
        return valueSetRepository.findAll();
    }
    
    public ValueSet findById(String id) {
        return valueSetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ValueSet not found with id: " + id));
    }
    
    public ValueSet findByUri(String uri) {
        return valueSetRepository.findByUri(uri)
                .orElseThrow(() -> new ResourceNotFoundException("ValueSet not found with uri: " + uri));
    }
    
    public ValueSet findByUriAndVersion(String uri, String version) {
        return valueSetRepository.findByUriAndVersion(uri, version)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "ValueSet not found with uri: " + uri + " and version: " + version));
    }
    
    public ValueSet save(ValueSet valueSet) {
        valueSet.setLastUpdated(LocalDateTime.now());
        return valueSetRepository.save(valueSet);
    }
    
    public void delete(String id) {
        valueSetRepository.deleteById(id);
    }
    
    public List<ValueSet> search(String query) {
        return valueSetRepository.findByNameContainingIgnoreCase(query);
    }
    
    public ValueSet expand(String valueSetUri, Integer offset, Integer count) {
        ValueSet valueSet = findByUri(valueSetUri);
        
        // Create a new expansion
        ValueSet.Expansion expansion = new ValueSet.Expansion();
        expansion.setTimestamp(LocalDateTime.now());
        expansion.setContains(new ArrayList<>());
        
        if (offset != null) {
            expansion.setOffset(offset);
        }
        
        // Process each include in the compose section
        if (valueSet.getCompose() != null && valueSet.getCompose().getInclude() != null) {
            for (ValueSet.Include include : valueSet.getCompose().getInclude()) {
                // Handle direct concepts first
                if (include.getConcept() != null && !include.getConcept().isEmpty()) {
                    for (ValueSet.ValueSetConcept concept : include.getConcept()) {
                        ValueSet.Contains contains = new ValueSet.Contains();
                        contains.setSystem(include.getSystem());
                        contains.setVersion(include.getVersion());
                        contains.setCode(concept.getCode());
                        contains.setDisplay(concept.getDisplay());
                        expansion.getContains().add(contains);
                    }
                }
                
                // Handle system reference
                if (include.getSystem() != null) {
                    try {
                        // Get all concepts from the code system
                        CodeSystem codeSystem = codeSystemService.findByUri(include.getSystem());
                        
                        addConceptsToExpansion(codeSystem.getConcept(), include.getSystem(), 
                                include.getVersion(), expansion.getContains());
                    } catch (ResourceNotFoundException e) {
                        log.warn("Referenced code system not found: {}", include.getSystem());
                    }
                }
                
                // Handle filters - this would be more complex, skipping for simplicity
            }
        }
        
        // Apply pagination
        if (count != null && count > 0 && expansion.getContains().size() > count) {
            int startIndex = offset != null ? offset : 0;
            int endIndex = Math.min(startIndex + count, expansion.getContains().size());
            
            if (startIndex < expansion.getContains().size()) {
                expansion.setContains(expansion.getContains().subList(startIndex, endIndex));
            }
        }
        
        expansion.setTotal(expansion.getContains().size());
        valueSet.setExpansion(expansion);
        
        return valueSet;
    }
    
    private void addConceptsToExpansion(List<CodeSystem.Concept> concepts, String system, 
                                       String version, List<ValueSet.Contains> containsList) {
        if (concepts == null || concepts.isEmpty()) {
            return;
        }
        
        for (CodeSystem.Concept concept : concepts) {
            ValueSet.Contains contains = new ValueSet.Contains();
            contains.setSystem(system);
            contains.setVersion(version);
            contains.setCode(concept.getCode());
            contains.setDisplay(concept.getDisplay());
            containsList.add(contains);
            
            // Process child concepts recursively
            if (concept.getConcept() != null && !concept.getConcept().isEmpty()) {
                addConceptsToExpansion(concept.getConcept(), system, version, containsList);
            }
        }
    }
}
```

#### ConceptMap Service

```java
import com.healthcare.terminology.exception.ResourceNotFoundException;
import com.healthcare.terminology.model.ConceptMap;
import com.healthcare.terminology.repository.ConceptMapRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ConceptMapService {
    
    private final ConceptMapRepository conceptMapRepository;
    
    public List<ConceptMap> findAll() {
        return conceptMapRepository.findAll();
    }
    
    public ConceptMap findById(String id) {
        return conceptMapRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ConceptMap not found with id: " + id));
    }
    
    public ConceptMap findByUri(String uri) {
        return conceptMapRepository.findByUri(uri)
                .orElseThrow(() -> new ResourceNotFoundException("ConceptMap not found with uri: " + uri));
    }
    
    public List<ConceptMap> findBySourceAndTarget(String sourceUri, String targetUri) {
        return conceptMapRepository.findBySourceUriAndTargetUri(sourceUri, targetUri);
    }
    
    public ConceptMap save(ConceptMap conceptMap) {
        conceptMap.setLastUpdated(LocalDateTime.now());
        return conceptMapRepository.save(conceptMap);
    }
    
    public void delete(String id) {
        conceptMapRepository.deleteById(id);
    }
    
    public List<ConceptMap.Target> translate(String code, String system, String targetSystem) {
        List<ConceptMap> maps = conceptMapRepository.findBySourceUriAndTargetUri(system, targetSystem);
        List<ConceptMap.Target> results = new ArrayList<>();
        
        for (ConceptMap map : maps) {
            for (ConceptMap.Group group : map.getGroup()) {
                for (ConceptMap.Element element : group.getElement()) {
                    if (element.getCode().equals(code)) {
                        results.addAll(element.getTarget());
                    }
                }
            }
        }
        
        return results;
    }
}
```

### Controllers

Tạo các RESTful controllers cho Terminology Service:

#### CodeSystem Controller

```java

import com.healthcare.terminology.model.CodeSystem;
import com.healthcare.terminology.service.CodeSystemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/terminology/codesystem")
@RequiredArgsConstructor
public class CodeSystemController {
    
    private final CodeSystemService codeSystemService;
    
    @GetMapping
    public ResponseEntity<List<CodeSystem>> getAllCodeSystems() {
        return ResponseEntity.ok(codeSystemService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CodeSystem> getCodeSystemById(@PathVariable String id) {
        return ResponseEntity.ok(codeSystemService.findById(id));
    }
    
    @GetMapping("/uri")
    public ResponseEntity<CodeSystem> getCodeSystemByUri(
            @RequestParam String uri,
            @RequestParam(required = false) String version) {
        if (version != null) {
            return ResponseEntity.ok(codeSystemService.findByUriAndVersion(uri, version));
        }
        return ResponseEntity.ok(codeSystemService.findByUri(uri));
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ROLE_TERMINOLOGY_ADMIN')")
    public ResponseEntity<CodeSystem> createCodeSystem(@RequestBody CodeSystem codeSystem) {
        return ResponseEntity.status(HttpStatus.CREATED).body(codeSystemService.save(codeSystem));
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_TERMINOLOGY_ADMIN')")
    public ResponseEntity<CodeSystem> updateCodeSystem(
            @PathVariable String id,
            @RequestBody CodeSystem codeSystem) {
        codeSystem.setId(id);
        return ResponseEntity.ok(codeSystemService.save(codeSystem));
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_TERMINOLOGY_ADMIN')")
    public ResponseEntity<Void> deleteCodeSystem(@PathVariable String id) {
        codeSystemService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<CodeSystem>> searchCodeSystems(@RequestParam String query) {
        return ResponseEntity.ok(codeSystemService.search(query));
    }
    
    @GetMapping("/validate")
    public ResponseEntity<Map<String, Boolean>> validateCode(
            @RequestParam String system,
            @RequestParam String code) {
        boolean isValid = codeSystemService.validateCode(system, code);
        return ResponseEntity.ok(Map.of("valid", isValid));
    }
    
    @GetMapping("/lookup")
    public ResponseEntity<?> lookupCode(
            @RequestParam String system,
            @RequestParam String code) {
        Optional<CodeSystem.Concept> concept = codeSystemService.lookupCode(system, code);
        return concept.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
```

#### ValueSet Controller

```java

import com.healthcare.terminology.model.ValueSet;
import com.healthcare.terminology.service.ValueSetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/terminology/valueset")
@RequiredArgsConstructor
public class ValueSetController {
    
    private final ValueSetService valueSetService;
    
    @GetMapping
    public ResponseEntity<List<ValueSet>> getAllValueSets() {
        return ResponseEntity.ok(valueSetService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ValueSet> getValueSetById(@PathVariable String id) {
        return ResponseEntity.ok(valueSetService.findById(id));
    }
    
    @GetMapping("/uri")
    public ResponseEntity<ValueSet> getValueSetByUri(
            @RequestParam String uri,
            @RequestParam(required = false) String version) {
        if (version != null) {
            return ResponseEntity.ok(valueSetService.findByUriAndVersion(uri, version));
        }
        return ResponseEntity.ok(valueSetService.findByUri(uri));
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ROLE_TERMINOLOGY_ADMIN')")
    public ResponseEntity<ValueSet> createValueSet(@RequestBody ValueSet valueSet) {
        return ResponseEntity.status(HttpStatus.CREATED).body(valueSetService.save(valueSet));
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_TERMINOLOGY_ADMIN')")
    public ResponseEntity<ValueSet> updateValueSet(
            @PathVariable String id,
            @RequestBody ValueSet valueSet) {
        valueSet.setId(id);
        return ResponseEntity.ok(valueSetService.save(valueSet));
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_TERMINOLOGY_ADMIN')")
    public ResponseEntity<Void> deleteValueSet(@PathVariable String id) {
        valueSetService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<ValueSet>> searchValueSets(@RequestParam String query) {
        return ResponseEntity.ok(valueSetService.search(query));
    }
    
    @GetMapping("/expand")
    public ResponseEntity<ValueSet> expandValueSet(
            @RequestParam String uri,
            @RequestParam(required = false) Integer offset,
            @RequestParam(required = false) Integer count) {
        return ResponseEntity.ok(valueSetService.expand(uri, offset, count));
    }
}
```

#### ConceptMap Controller

```java
import com.healthcare.terminology.model.ConceptMap;
import com.healthcare.terminology.service.ConceptMapService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/terminology/conceptmap")
@RequiredArgsConstructor
public class ConceptMapController {
    
    private final ConceptMapService conceptMapService;
    
    @GetMapping
    public ResponseEntity<List<ConceptMap>> getAllConceptMaps() {
        return ResponseEntity.ok(conceptMapService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ConceptMap> getConceptMapById(@PathVariable String id) {
        return ResponseEntity.ok(conceptMapService.findById(id));
    }
    
    @GetMapping("/uri")
    public ResponseEntity<ConceptMap> getConceptMapByUri(@RequestParam String uri) {
        return ResponseEntity.ok(conceptMapService.findByUri(uri));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<ConceptMap>> findBySourceAndTarget(
            @RequestParam(required = false) String sourceUri,
            @RequestParam(required = false) String targetUri) {
        if (sourceUri != null && targetUri != null) {
            return ResponseEntity.ok(conceptMapService.findBySourceAndTarget(sourceUri, targetUri));
        }
        return ResponseEntity.ok(conceptMapService.findAll());
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ROLE_TERMINOLOGY_ADMIN')")
    public ResponseEntity<ConceptMap> createConceptMap(@RequestBody ConceptMap conceptMap) {
        return ResponseEntity.status(HttpStatus.CREATED).body(conceptMapService.save(conceptMap));
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_TERMINOLOGY_ADMIN')")
    public ResponseEntity<ConceptMap> updateConceptMap(
            @PathVariable String id,
            @RequestBody ConceptMap conceptMap) {
        conceptMap.setId(id);
        return ResponseEntity.ok(conceptMapService.save(conceptMap));
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_TERMINOLOGY_ADMIN')")
    public ResponseEntity<Void> deleteConceptMap(@PathVariable String id) {
        conceptMapService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/translate")
    public ResponseEntity<List<ConceptMap.Target>> translateCode(
            @RequestParam String code,
            @RequestParam String system,
            @RequestParam String targetSystem) {
        return ResponseEntity.ok(conceptMapService.translate(code, system, targetSystem));
    }
}
```

#### FHIR Terminology Operations Controller

```java

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;
import io.akitect.healthcare.terminology.model.CodeSystem;
import io.akitect.healthcare.terminology.model.ConceptMap;
import io.akitect.healthcare.terminology.service.CodeSystemService;
import io.akitect.healthcare.terminology.service.ConceptMapService;
import io.akitect.healthcare.terminology.service.ValueSetService;
import lombok.RequiredArgsConstructor;
import org.hl7.fhir.r5.model.Parameters;
import org.hl7.fhir.r5.model.UriType;
import org.hl7.fhir.r5.model.IntegerType;
import org.hl7.fhir.r5.model.StringType;
import org.hl7.fhir.r5.model.OperationOutcome;
import org.hl7.fhir.r5.model.Enumerations;
import org.hl7.fhir.r5.model.DateTimeType;
import org.hl7.fhir.r5.model.BooleanType;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/fhir/terminology")
@RequiredArgsConstructor
public class FhirTerminologyOperationsController {

    private final CodeSystemService codeSystemService;
    private final ValueSetService valueSetService;
    private final ConceptMapService conceptMapService;
    private final FhirContext fhirContext = FhirContext.forR5();

    @PostMapping(value = "/ValueSet/$expand", produces = {MediaType.APPLICATION_JSON_VALUE, "application/fhir+json"})
    public ResponseEntity<String> expandValueSet(@RequestBody Parameters parameters) {
        IParser parser = fhirContext.newJsonParser().setPrettyPrint(true);

        String valueSetUri = null;
        Integer offset = null;
        Integer count = null;

        // Extract parameters
        for (Parameters.ParametersParameterComponent param : parameters.getParameter()) {
            if (param.getName().equals("url") && param.getValue() instanceof UriType) {
                valueSetUri = ((UriType) param.getValue()).getValueAsString();
            } else if (param.getName().equals("offset") && param.getValue() instanceof IntegerType) {
                offset = ((IntegerType) param.getValue()).getValue();
            } else if (param.getName().equals("count") && param.getValue() instanceof IntegerType) {
                count = ((IntegerType) param.getValue()).getValue();
            }
        }

        if (valueSetUri == null) {
            return ResponseEntity.badRequest().body(createOperationOutcome("error", "ValueSet URI is required"));
        }

        try {
            io.akitect.healthcare.terminology.model.ValueSet valueSet = valueSetService.expand(valueSetUri, offset, count);

            // Convert to FHIR ValueSet
            org.hl7.fhir.r5.model.ValueSet fhirValueSet = convertToFhirValueSet(valueSet);

            return ResponseEntity.ok(parser.encodeResourceToString(fhirValueSet));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(createOperationOutcome("error", e.getMessage()));
        }
    }

    @PostMapping(value = "/CodeSystem/$lookup", produces = {MediaType.APPLICATION_JSON_VALUE, "application/fhir+json"})
    public ResponseEntity<String> lookupCode(@RequestBody Parameters parameters) {
        IParser parser = fhirContext.newJsonParser().setPrettyPrint(true);

        String code = null;
        String system = null;

        // Extract parameters
        for (Parameters.ParametersParameterComponent param : parameters.getParameter()) {
            if (param.getName().equals("code") && param.getValue() instanceof StringType) {
                code = ((StringType) param.getValue()).getValue();
            } else if (param.getName().equals("system") && param.getValue() instanceof UriType) {
                system = ((UriType) param.getValue()).getValue();
            }
        }

        if (code == null || system == null) {
            return ResponseEntity.badRequest().body(createOperationOutcome("error", "Code and system are required"));
        }

        try {
            Optional<CodeSystem.Concept> concept = codeSystemService.lookupCode(system, code);

            if (concept.isEmpty()) {
                return ResponseEntity.badRequest().body(createOperationOutcome("error", "Code not found"));
            }

            // Create response parameters
            Parameters responseParams = new Parameters();

            // Add code
            responseParams.addParameter().setName("code").setValue(new StringType(concept.get().getCode()));

            // Add display
            if (concept.get().getDisplay() != null) {
                responseParams.addParameter().setName("display").setValue(new StringType(concept.get().getDisplay()));
            }

            // Add definition if available
            if (concept.get().getDefinition() != null) {
                responseParams.addParameter().setName("definition").setValue(new StringType(concept.get().getDefinition()));
            }

            return ResponseEntity.ok(parser.encodeResourceToString(responseParams));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(createOperationOutcome("error", e.getMessage()));
        }
    }

    @PostMapping(value = "/ConceptMap/$translate", produces = {MediaType.APPLICATION_JSON_VALUE, "application/fhir+json"})
    public ResponseEntity<String> translateCode(@RequestBody Parameters parameters) {
        IParser parser = fhirContext.newJsonParser().setPrettyPrint(true);

        String code = null;
        String system = null;
        String targetSystem = null;

        // Extract parameters
        for (Parameters.ParametersParameterComponent param : parameters.getParameter()) {
            if (param.getName().equals("code") && param.getValue() instanceof StringType) {
                code = ((StringType) param.getValue()).getValue();
            } else if (param.getName().equals("system") && param.getValue() instanceof UriType) {
                system = ((UriType) param.getValue()).getValue();
            } else if (param.getName().equals("targetSystem") && param.getValue() instanceof UriType) {
                targetSystem = ((UriType) param.getValue()).getValue();
            }
        }

        if (code == null || system == null || targetSystem == null) {
            return ResponseEntity.badRequest().body(
                    createOperationOutcome("error", "Code, system, and targetSystem are required"));
        }

        try {
            List<ConceptMap.Target> targets = conceptMapService.translate(code, system, targetSystem);

            // Create response parameters
            Parameters responseParams = new Parameters();

            Parameters.ParametersParameterComponent resultParam = responseParams.addParameter().setName("result");
            resultParam.setValue(new BooleanType(!targets.isEmpty()));

            // Add matches
            for (ConceptMap.Target target : targets) {
                Parameters.ParametersParameterComponent matchParam = responseParams.addParameter().setName("match");

                // Add code
                matchParam.addPart().setName("code").setValue(new StringType(target.getCode()));

                // Add equivalence
                if (target.getEquivalence() != null) {
                    matchParam.addPart().setName("equivalence").setValue(new StringType(target.getEquivalence()));
                }

                // Add display
                if (target.getDisplay() != null) {
                    matchParam.addPart().setName("display").setValue(new StringType(target.getDisplay()));
                }
            }

            return ResponseEntity.ok(parser.encodeResourceToString(responseParams));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(createOperationOutcome("error", e.getMessage()));
        }
    }

    private String createOperationOutcome(String severity, String message) {
        IParser parser = fhirContext.newJsonParser().setPrettyPrint(true);

        OperationOutcome outcome = new OperationOutcome();
        OperationOutcome.OperationOutcomeIssueComponent issue = outcome.addIssue();

        if ("error".equals(severity)) {
            issue.setSeverity(OperationOutcome.IssueSeverity.ERROR);
            issue.setCode(OperationOutcome.IssueType.PROCESSING);
        } else {
            issue.setSeverity(OperationOutcome.IssueSeverity.WARNING);
            issue.setCode(OperationOutcome.IssueType.INCOMPLETE);
        }

        issue.setDiagnostics(message);

        return parser.encodeResourceToString(outcome);
    }

    // Helper method to convert internal ValueSet to FHIR ValueSet
    private org.hl7.fhir.r5.model.ValueSet convertToFhirValueSet(io.akitect.healthcare.terminology.model.ValueSet valueSet) {
        org.hl7.fhir.r5.model.ValueSet fhirValueSet = new org.hl7.fhir.r5.model.ValueSet();

        // Set metadata
        fhirValueSet.setId(valueSet.getId());
        fhirValueSet.setUrl(valueSet.getUri());
        fhirValueSet.setVersion(valueSet.getVersion());
        fhirValueSet.setName(valueSet.getName());
        fhirValueSet.setTitle(valueSet.getName());
        fhirValueSet.setStatus(Enumerations.PublicationStatus.fromCode(String.valueOf(valueSet.getStatus())));
        fhirValueSet.setDescription(valueSet.getDescription());
        fhirValueSet.setPublisher(valueSet.getPublisher());
        fhirValueSet.setCopyright(valueSet.getCopyright());

        // Set expansion
        if (valueSet.getExpansion() != null) {
            org.hl7.fhir.r5.model.ValueSet.ValueSetExpansionComponent expansion = fhirValueSet.getExpansion();

            if (valueSet.getExpansion().getTimestamp() != null) {
                expansion.setTimestampElement(new DateTimeType(valueSet.getExpansion().getTimestamp().toString()));
            }

            expansion.setTotal(valueSet.getExpansion().getTotal());
            expansion.setOffset(valueSet.getExpansion().getOffset());

            // Add parameters
            if (valueSet.getExpansion().getParameter() != null) {
                for (io.akitect.healthcare.terminology.model.ValueSet.Parameter param : valueSet.getExpansion().getParameter()) {
                    org.hl7.fhir.r5.model.ValueSet.ValueSetExpansionParameterComponent parameter = expansion.addParameter();
                    parameter.setName(param.getName());
                    parameter.setValue(new StringType(param.getValue()));
                }
            }

            // Add contains elements
            if (valueSet.getExpansion().getContains() != null) {
                addExpansionContains(valueSet.getExpansion().getContains(), expansion);
            }
        }

        return fhirValueSet;
    }

    private void addExpansionContains(List<io.akitect.healthcare.terminology.model.ValueSet.Contains> contains,
                                      org.hl7.fhir.r5.model.ValueSet.ValueSetExpansionComponent expansion) {
        for (io.akitect.healthcare.terminology.model.ValueSet.Contains item : contains) {
            org.hl7.fhir.r5.model.ValueSet.ValueSetExpansionContainsComponent containsComponent = expansion.addContains();

            containsComponent.setSystem(item.getSystem());
            containsComponent.setVersion(item.getVersion());
            containsComponent.setCode(item.getCode());
            containsComponent.setDisplay(item.getDisplay());

            if (item.getInactive() != null) {
                containsComponent.setInactive(item.getInactive());
            }

            // Process nested contains
            if (item.getContains() != null && !item.getContains().isEmpty()) {
                addExpansionContains(item.getContains(), expansion);
            }
        }
    }
}
```

### Cấu hình Security với Keycloak

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/actuator/**").permitAll()
                .requestMatchers("/api/terminology/*/search").permitAll()
                .requestMatchers("/api/terminology/**/validate", 
                                 "/api/terminology/**/lookup", 
                                 "/api/terminology/**/expand", 
                                 "/api/terminology/**/translate").authenticated()
                .requestMatchers("/api/fhir/terminology/**").authenticated()
                .anyRequest().hasRole("TERMINOLOGY_ADMIN")
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt
                    .jwtAuthenticationConverter(jwtAuthenticationConverter())
                )
            );
        
        return http.build();
    }
    
    private JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter jwtConverter = new JwtAuthenticationConverter();
        jwtConverter.setJwtGrantedAuthoritiesConverter(new KeycloakRealmRoleConverter());
        return jwtConverter;
    }
    
    static class KeycloakRealmRoleConverter implements Converter<Jwt, Collection<GrantedAuthority>> {
        @Override
        public Collection<GrantedAuthority> convert(Jwt jwt) {
            final Map<String, Object> realmAccess = (Map<String, Object>) jwt.getClaims().get("realm_access");
            return ((List<String>) realmAccess.get("roles")).stream()
                    .map(roleName -> "ROLE_" + roleName)
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());
        }
    }
}
```

### Tích hợp Eureka Client

```java
package com.healthcare.terminology;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class TerminologyServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(TerminologyServiceApplication.class, args);
    }
}
```

### Tạo Dockerfile

```dockerfile
FROM openjdk:21-slim
WORKDIR /app
COPY target/terminology-service-1.0.0.jar app.jar
EXPOSE 8301
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Triển khai trên Kubernetes

Tạo file Kubernetes manifest để triển khai service:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: terminology-service
  namespace: healthcare
spec:
  replicas: 2
  selector:
    matchLabels:
      app: terminology-service
  template:
    metadata:
      labels:
        app: terminology-service
    spec:
      containers:
      - name: terminology-service
        image: healthcare/terminology-service:1.0.0
        ports:
        - containerPort: 8301
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "prod"
        - name: CONFIG_SERVER_HOST
          value: "config-server"
        - name: EUREKA_HOST
          value: "discovery-service"
        - name: MONGODB_HOST
          value: "mongodb"
        - name: KEYCLOAK_URL
          value: "http://keycloak:8180"
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1024Mi"
            cpu: "1000m"
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8301
          initialDelaySeconds: 30
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8301
          initialDelaySeconds: 60
          periodSeconds: 30
---
apiVersion: v1
kind: Service
metadata:
  name: terminology-service
  namespace: healthcare
spec:
  selector:
    app: terminology-service
  ports:
  - port: 8301
    targetPort: 8301
  type: ClusterIP
```

### Kết luận

Trong bài viết này, chúng ta đã xây dựng một Terminology Service cho hệ thống y tế FHIR R5, tích hợp với MongoDB để lưu trữ dữ liệu, Keycloak để bảo mật và phân quyền, Spring Cloud Config Server để quản lý cấu hình và Eureka Client để service discovery.

Terminology Service này hỗ trợ đầy đủ các FHIR Terminology Operations như:

* Quản lý CodeSystem (hệ thống mã)
* Quản lý ValueSet (tập giá trị)
* Quản lý ConceptMap (ánh xạ khái niệm)
* Lookup code (tra cứu mã)
* Expand ValueSet (mở rộng tập giá trị)
* Validate code (xác thực mã)
* Translate code (chuyển đổi mã)

Dịch vụ này đóng vai trò quan trọng trong hệ thống y tế, đảm bảo các thuật ngữ được sử dụng nhất quán trong toàn bộ hệ thống và tạo điều kiện cho khả năng tương tác với các hệ thống khác. Là một microservice độc lập, nó có thể dễ dàng được tích hợp vào kiến trúc tổng thể của hệ thống y tế dựa trên FHIR R5.

Bằng cách sử dụng MongoDB làm cơ sở dữ liệu, chúng ta có được khả năng lưu trữ linh hoạt cho các cấu trúc dữ liệu phức tạp và hiệu suất truy vấn cao. Việc tích hợp với Keycloak cung cấp hệ thống bảo mật mạnh mẽ, trong khi Spring Cloud Config Server và Eureka Client giúp service của chúng ta dễ dàng hoạt động trong môi trường cloud native.

Để cải thiện hơn nữa, chúng ta có thể xem xét thêm các tính năng như:

* Caching để cải thiện hiệu suất
* Bulk import/export cho các bộ mã lớn
* Hỗ trợ phiên bản cho các terminology resources
* API để đồng bộ terminology với các nguồn chuẩn quốc tế

Với những tính năng này, Terminology Service sẽ là một thành phần quan trọng trong việc xây dựng hệ thống y tế hiện đại và có khả năng tương tác cao.
