package com.example.demo.controller;

import com.example.demo.java.AddEnterpriseData;
import com.example.demo.java.DeleteFile;
import com.example.demo.model.InformationSessionModel;
import com.example.demo.repository.InformationSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Controller
public class SpTeacherController {
    //-----------session start---------
    final
    HttpSession session;

    //-----------repository and session------------

    private final InformationSessionRepository informationSessionRepository;

    @Autowired
    public SpTeacherController(InformationSessionRepository informationSessionRepository, HttpSession session) {
        this.informationSessionRepository = informationSessionRepository;
        this.session = session;
    }

    //---------------------------------

    //---------- fileSave--------------
    private String getExtension(String filename) {
        int dot = filename.lastIndexOf(".");
        if (dot > 0) {
            return filename.substring(dot).toLowerCase();
        }
        return "";
    }

    private String getUploadFileName(String fileName) {

        File file = new File(fileName);
        String basename = file.getName();
        String woext = basename.substring(0,basename.lastIndexOf('.'));

        return woext + "_" +
                DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS")
                        .format(LocalDateTime.now())
                + getExtension(fileName);
    }

    private void createDirectory() {
        Path path = Paths.get("PDF");
        if (!Files.exists(path)) {
            try {
                Files.createDirectory(path);
            } catch (Exception e) {
                //エラー処理は省略
            }
        }
    }

    private String savefile(MultipartFile file) {
        String filename = getUploadFileName(file.getOriginalFilename());
        Path uploadfile = Paths.get("PDF/" + filename);
        try (var os = Files.newOutputStream(uploadfile, StandardOpenOption.CREATE)) {
            byte[] bytes = file.getBytes();
            os.write(bytes);

            return filename;
        } catch (IOException e) {
            //エラー処理は省略
            return "";
        }
    }

    private String savefiles(List<MultipartFile> multipartFiles) {
        createDirectory();
        String fileName = "";
        for (MultipartFile file : multipartFiles) {
           fileName = savefile(file);
        }
        return fileName;
    }
    //---------------------------------Controller----------------------------------

    @GetMapping("/disposeOfPDF")
    public String disposeOfPDF(){
        DeleteFile deleteFile = new DeleteFile();
        deleteFile.OnAllDelete();
        return "spC/spMenu";
    }


    //ログイン実装はあとあとがだるいのでログインした体での実装
    @RequestMapping("/spC")
    public String sp(){
        return "spC/spMenu";
    }
    //入力画面に飛ぶよ
    @GetMapping("addInformationSession")
    public String addIS() {
        return "spC/addInformationSession";
    }



    //入力画面からの入力を受付けて、modelにデータを渡すよ
    @PostMapping("/ISok")
    public String isok(
            AddEnterpriseData addData
            ) {

        if (addData.getTempfile() == null || addData.getTempfile().isEmpty()) {
            //エラー時の処理
            //まあファイルがなかった時の処理だね(´・ω・`)
            return "spC/spMenu";
        }
        assert addData.getTempfile() != null;
        String fileName = savefiles(addData.getTempfile());

        InformationSessionModel spModel = new InformationSessionModel();
        spModel.setKName(addData.getKName());
        spModel.setIndustry(addData.getIndustry());
        spModel.setDay(addData.getDay());
        spModel.setContents(addData.getContents());
        spModel.setPlace(addData.getPlace());
        spModel.setDeadline(addData.getDeadline());
        spModel.setURL(addData.getURL());
        spModel.setExplanation(addData.getExplanation());
        spModel.setTempfile(fileName);

        informationSessionRepository.save(spModel);

        return "spC/spMenu";
    }

    @PostMapping("ISChangeOkey")
    public String ISChange(
            @RequestParam String day,
            @RequestParam String place,
            @RequestParam String deadline,
            @ModelAttribute InformationSessionModel informationSessionModel,
            Model model
    ) {
        String id = session.getAttribute("isId").toString();
        informationSessionRepository.customUpdateFileById(day, deadline, place, id);
        model.addAttribute("ketsu", informationSessionRepository.findAll());
        return "/spC/ISSearch";
    }

    @GetMapping("ISSearch")
    public String ketsuANA(
            @ModelAttribute InformationSessionModel informationSessionModel,
            Model model
    ) {
        model.addAttribute("ketsu", informationSessionRepository.findAll());
        return "/spC/ISSearch";
    }

    @PostMapping("ISprint")
    public String ISChange(
            Model model,
            @RequestParam String isId
            ) {
        model.addAttribute("filePath", informationSessionRepository.customFindFilePathById(isId));
        model.addAttribute("filePath2", "/PDF/" + informationSessionRepository.customFindFilePathById(isId).substring(0,informationSessionRepository.customFindFilePathById(isId).lastIndexOf('.')));
        return "/spC/ISprint";
    }

    @PostMapping("ISChange")
    public String ISChange(
            @RequestParam String isId,
            Model model
    ) {
        System.out.println(isId);
        model.addAttribute("changeData", informationSessionRepository.customFindChangesById(isId));
        session.setAttribute("isId", isId);
        return "/spC/ISChange";
    }

    @PostMapping("ISDelete")
    public String ISDelete(
            @RequestParam String isId,
            @ModelAttribute InformationSessionModel informationSessionModel,
            Model model
    ) {
        String filePath = informationSessionRepository.customFindFilePathById(isId);
        System.out.println(filePath);
        DeleteFile deleteFile = new DeleteFile();
        deleteFile.OnDelete(filePath);
        informationSessionRepository.customDeleteFileById(isId);

        model.addAttribute("ketsu",informationSessionRepository.findAll());
        return "/spC/ISSearch";
    }

}
