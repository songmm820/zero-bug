use tauri::{
    window::{Effect, EffectsBuilder},
    WebviewUrl, WebviewWindowBuilder,
};

mod commands;

#[cfg_attr(mobile, tauri::mobile_entry_point)]

pub fn run() {
    tauri::Builder::default()
        .setup(move |app| {
            let win_width = 800.;
            let win_height = 700.;

            let effects = EffectsBuilder::new()
                .effects(vec![Effect::Acrylic, Effect::Blur])
                .build();

            let mut window_builder = WebviewWindowBuilder::new(app, "main", WebviewUrl::default());

            window_builder = window_builder
                // 设置窗口大小
                .inner_size(win_width, win_height)
                // 设置窗口透明背景
                .transparent(true)
                // 设置窗口磨砂背景
                .effects(effects)
                // 使用黑色主题
                .theme(Some(tauri::Theme::Dark));

            let _ = window_builder.build()?;

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![commands::greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
