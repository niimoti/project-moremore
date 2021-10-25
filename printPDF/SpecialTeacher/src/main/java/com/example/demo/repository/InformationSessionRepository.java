package com.example.demo.repository;

import com.example.demo.model.InformationSessionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface InformationSessionRepository extends JpaRepository<InformationSessionModel, Long> {

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM INFORMATION_SESSION_MODEL WHERE id = ?1", nativeQuery = true)
    void customDeleteFileById(String deleteID);

    @Modifying
    @Transactional
    @Query(value = "UPDATE INFORMATION_SESSION_MODEL SET DAY = ?1, DEADLINE = ?2, PLACE = ?3 WHERE ID = ?4", nativeQuery = true)
    void customUpdateFileById(String day,String deadline, String place, String id);

    @Query(value = "SELECT TEMPFILE FROM INFORMATION_SESSION_MODEL WHERE id = ?1", nativeQuery = true)
    String customFindFilePathById(String id);

    @Query(value = "SELECT * FROM INFORMATION_SESSION_MODEL WHERE id = ?1", nativeQuery = true)
    List<InformationSessionModel> customFindALLById(String id);

    @Query(value = "SELECT * FROM INFORMATION_SESSION_MODEL WHERE id = ?1", nativeQuery = true)
    List<InformationSessionModel> customFindChangesById(String id);



}
