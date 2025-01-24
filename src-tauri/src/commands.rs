// use std::process::Command;
// use tauri::api::dialog;

// #[tauri::command]
// pub fn select_file() -> Option<String> {
//     dialog::FileDialogBuilder::new().pick_file().map(|path| path.to_string_lossy().to_string())
// }

// #[tauri::command]
// pub fn select_directory() -> Option<String> {
//     dialog::FileDialogBuilder::new().pick_folder().map(|path| path.to_string_lossy().to_string())
// }

// #[tauri::command]
// pub fn convert_file(input: String, output_dir: String, format: String) -> Result<String, String> {
//     let output_file = format!("{}/output.{}", output_dir, format);
//     let status = Command::new("ffmpeg")
//         .arg("-i")
//         .arg(&input)
//         .arg(&output_file)
//         .status();

//     match status {
//         Ok(s) if s.success() => Ok(output_file),
//         _ => Err("Conversion failed!".to_string()),
//     }
// }
