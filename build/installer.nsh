!macro preInit
  SetRegView 64
  WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$LocalAppData\Programs\${PRODUCT_FILENAME}"
  WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$LocalAppData\Programs\${PRODUCT_FILENAME}"

  WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}"  "URL Protocol" ""
  WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}"  "@" "URL:gsapp"
  WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}"  "@" "$LocalAppData\Programs\${PRODUCT_FILENAME}"


  SetRegView 32
  WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$LocalAppData\Programs\${PRODUCT_FILENAME}"
  WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$LocalAppData\Programs\${PRODUCT_FILENAME}"
  !system "echo '${INSTALL_REGISTRY_KEY}' > ${BUILD_RESOURCES_DIR}/preInit"
!macroend
