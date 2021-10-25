package com.example.demo.java;

import java.io.File;

public class DeleteFile {

    //選択して削除する場合が以下を実行
    public void OnDelete(String path) {
        File dir = new File("PDF/" + path);
        dir.delete();
    }
    //        ディレクトリ配下のすべてのファイルを削除したい場合は以下を実行
    public void OnAllDelete() {
        File dir = new File("PDF");
        File[] files = dir.listFiles();
        for (int i = 0; i < files.length; i++){
            if (files[i].exists() && files[i].isFile()) {
                files[i].delete();
                System.out.println((i + 1) + "個目のファイル削除");
            }
        }

    }

}
