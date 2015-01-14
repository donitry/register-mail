namespace GameControl
{
    partial class GameControl
    {
        /// <summary>
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows 窗体设计器生成的代码

        /// <summary>
        /// 设计器支持所需的方法 - 不要
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            this.TabControlA = new System.Windows.Forms.TabControl();
            this.TabPageRegister = new System.Windows.Forms.TabPage();
            this.ListBox_VerifyResult = new System.Windows.Forms.ListBox();
            this.button1 = new System.Windows.Forms.Button();
            this.TxtBox_HttpResponse = new System.Windows.Forms.TextBox();
            this.label_Response = new System.Windows.Forms.Label();
            this.label_ChooseXml = new System.Windows.Forms.Label();
            this.But_SubmitReg = new System.Windows.Forms.Button();
            this.TxtBox_VerifyCode = new System.Windows.Forms.TextBox();
            this.label_VerifyCode = new System.Windows.Forms.Label();
            this.PicBox_VerifyCode = new System.Windows.Forms.PictureBox();
            this.label_VerifyCodePic = new System.Windows.Forms.Label();
            this.But_ProxyNext = new System.Windows.Forms.Button();
            this.But_StartReg = new System.Windows.Forms.Button();
            this.CboBox_XmlFile = new System.Windows.Forms.ComboBox();
            this.TabVerifyCode = new System.Windows.Forms.TabPage();
            this.TabPageSetArg = new System.Windows.Forms.TabPage();
            this.TxtBox_Proxy = new System.Windows.Forms.TextBox();
            this.label_Proxy = new System.Windows.Forms.Label();
            this.StatusStripA = new System.Windows.Forms.StatusStrip();
            this.StatusLabel_Form = new System.Windows.Forms.ToolStripStatusLabel();
            this.ScriptProgressBar = new System.Windows.Forms.ToolStripProgressBar();
            this.SaveXmlDialog = new System.Windows.Forms.SaveFileDialog();
            this.TabControlA.SuspendLayout();
            this.TabPageRegister.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.PicBox_VerifyCode)).BeginInit();
            this.TabPageSetArg.SuspendLayout();
            this.StatusStripA.SuspendLayout();
            this.SuspendLayout();
            // 
            // TabControlA
            // 
            this.TabControlA.Controls.Add(this.TabPageRegister);
            this.TabControlA.Controls.Add(this.TabVerifyCode);
            this.TabControlA.Controls.Add(this.TabPageSetArg);
            this.TabControlA.Location = new System.Drawing.Point(0, 1);
            this.TabControlA.Name = "TabControlA";
            this.TabControlA.SelectedIndex = 0;
            this.TabControlA.Size = new System.Drawing.Size(625, 359);
            this.TabControlA.TabIndex = 5;
            // 
            // TabPageRegister
            // 
            this.TabPageRegister.Controls.Add(this.ListBox_VerifyResult);
            this.TabPageRegister.Controls.Add(this.button1);
            this.TabPageRegister.Controls.Add(this.TxtBox_HttpResponse);
            this.TabPageRegister.Controls.Add(this.label_Response);
            this.TabPageRegister.Controls.Add(this.label_ChooseXml);
            this.TabPageRegister.Controls.Add(this.But_SubmitReg);
            this.TabPageRegister.Controls.Add(this.TxtBox_VerifyCode);
            this.TabPageRegister.Controls.Add(this.label_VerifyCode);
            this.TabPageRegister.Controls.Add(this.PicBox_VerifyCode);
            this.TabPageRegister.Controls.Add(this.label_VerifyCodePic);
            this.TabPageRegister.Controls.Add(this.But_ProxyNext);
            this.TabPageRegister.Controls.Add(this.But_StartReg);
            this.TabPageRegister.Controls.Add(this.CboBox_XmlFile);
            this.TabPageRegister.Location = new System.Drawing.Point(4, 22);
            this.TabPageRegister.Name = "TabPageRegister";
            this.TabPageRegister.Size = new System.Drawing.Size(617, 333);
            this.TabPageRegister.TabIndex = 2;
            this.TabPageRegister.Text = "Register";
            this.TabPageRegister.UseVisualStyleBackColor = true;
            // 
            // ListBox_VerifyResult
            // 
            this.ListBox_VerifyResult.FormattingEnabled = true;
            this.ListBox_VerifyResult.ItemHeight = 12;
            this.ListBox_VerifyResult.Location = new System.Drawing.Point(362, 27);
            this.ListBox_VerifyResult.Name = "ListBox_VerifyResult";
            this.ListBox_VerifyResult.Size = new System.Drawing.Size(248, 148);
            this.ListBox_VerifyResult.TabIndex = 46;
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(95, 155);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(75, 23);
            this.button1.TabIndex = 45;
            this.button1.Text = "button1";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // TxtBox_HttpResponse
            // 
            this.TxtBox_HttpResponse.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.TxtBox_HttpResponse.Location = new System.Drawing.Point(10, 194);
            this.TxtBox_HttpResponse.Multiline = true;
            this.TxtBox_HttpResponse.Name = "TxtBox_HttpResponse";
            this.TxtBox_HttpResponse.ScrollBars = System.Windows.Forms.ScrollBars.Vertical;
            this.TxtBox_HttpResponse.Size = new System.Drawing.Size(600, 136);
            this.TxtBox_HttpResponse.TabIndex = 44;
            // 
            // label_Response
            // 
            this.label_Response.AutoSize = true;
            this.label_Response.Location = new System.Drawing.Point(8, 179);
            this.label_Response.Name = "label_Response";
            this.label_Response.Size = new System.Drawing.Size(77, 12);
            this.label_Response.TabIndex = 41;
            this.label_Response.Text = "HttpResponse";
            // 
            // label_ChooseXml
            // 
            this.label_ChooseXml.AutoSize = true;
            this.label_ChooseXml.Location = new System.Drawing.Point(8, 12);
            this.label_ChooseXml.Name = "label_ChooseXml";
            this.label_ChooseXml.Size = new System.Drawing.Size(59, 12);
            this.label_ChooseXml.TabIndex = 35;
            this.label_ChooseXml.Text = "ChooseXml";
            // 
            // But_SubmitReg
            // 
            this.But_SubmitReg.Location = new System.Drawing.Point(265, 140);
            this.But_SubmitReg.Name = "But_SubmitReg";
            this.But_SubmitReg.Size = new System.Drawing.Size(91, 36);
            this.But_SubmitReg.TabIndex = 34;
            this.But_SubmitReg.Text = "SubmitReg";
            this.But_SubmitReg.UseVisualStyleBackColor = true;
            this.But_SubmitReg.Click += new System.EventHandler(this.But_SubmitReg_Click);
            // 
            // TxtBox_VerifyCode
            // 
            this.TxtBox_VerifyCode.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.TxtBox_VerifyCode.Location = new System.Drawing.Point(176, 155);
            this.TxtBox_VerifyCode.Name = "TxtBox_VerifyCode";
            this.TxtBox_VerifyCode.Size = new System.Drawing.Size(83, 21);
            this.TxtBox_VerifyCode.TabIndex = 33;
            // 
            // label_VerifyCode
            // 
            this.label_VerifyCode.AutoSize = true;
            this.label_VerifyCode.Location = new System.Drawing.Point(174, 140);
            this.label_VerifyCode.Name = "label_VerifyCode";
            this.label_VerifyCode.Size = new System.Drawing.Size(65, 12);
            this.label_VerifyCode.TabIndex = 32;
            this.label_VerifyCode.Text = "VerifyCode";
            // 
            // PicBox_VerifyCode
            // 
            this.PicBox_VerifyCode.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.PicBox_VerifyCode.Location = new System.Drawing.Point(176, 27);
            this.PicBox_VerifyCode.Name = "PicBox_VerifyCode";
            this.PicBox_VerifyCode.Size = new System.Drawing.Size(180, 110);
            this.PicBox_VerifyCode.TabIndex = 31;
            this.PicBox_VerifyCode.TabStop = false;
            this.PicBox_VerifyCode.Click += new System.EventHandler(this.PicBox_VerifyCode_Click);
            // 
            // label_VerifyCodePic
            // 
            this.label_VerifyCodePic.AutoSize = true;
            this.label_VerifyCodePic.Location = new System.Drawing.Point(174, 12);
            this.label_VerifyCodePic.Name = "label_VerifyCodePic";
            this.label_VerifyCodePic.Size = new System.Drawing.Size(83, 12);
            this.label_VerifyCodePic.TabIndex = 30;
            this.label_VerifyCodePic.Text = "VerifyCodePic";
            // 
            // But_ProxyNext
            // 
            this.But_ProxyNext.Enabled = false;
            this.But_ProxyNext.Location = new System.Drawing.Point(95, 53);
            this.But_ProxyNext.Name = "But_ProxyNext";
            this.But_ProxyNext.Size = new System.Drawing.Size(75, 23);
            this.But_ProxyNext.TabIndex = 29;
            this.But_ProxyNext.Text = "ARegProxy";
            this.But_ProxyNext.UseVisualStyleBackColor = true;
            this.But_ProxyNext.Click += new System.EventHandler(this.But_ProxyNext_Click);
            // 
            // But_StartReg
            // 
            this.But_StartReg.Enabled = false;
            this.But_StartReg.Location = new System.Drawing.Point(10, 53);
            this.But_StartReg.Name = "But_StartReg";
            this.But_StartReg.Size = new System.Drawing.Size(75, 23);
            this.But_StartReg.TabIndex = 28;
            this.But_StartReg.Text = "StartReg";
            this.But_StartReg.UseVisualStyleBackColor = true;
            this.But_StartReg.Click += new System.EventHandler(this.But_StartReg_Click);
            // 
            // CboBox_XmlFile
            // 
            this.CboBox_XmlFile.FormattingEnabled = true;
            this.CboBox_XmlFile.Location = new System.Drawing.Point(10, 27);
            this.CboBox_XmlFile.Name = "CboBox_XmlFile";
            this.CboBox_XmlFile.Size = new System.Drawing.Size(160, 20);
            this.CboBox_XmlFile.TabIndex = 26;
            this.CboBox_XmlFile.TextChanged += new System.EventHandler(this.CboBox_XmlFile_TextChanged);
            // 
            // TabVerifyCode
            // 
            this.TabVerifyCode.Location = new System.Drawing.Point(4, 22);
            this.TabVerifyCode.Name = "TabVerifyCode";
            this.TabVerifyCode.Padding = new System.Windows.Forms.Padding(3);
            this.TabVerifyCode.Size = new System.Drawing.Size(617, 333);
            this.TabVerifyCode.TabIndex = 0;
            this.TabVerifyCode.Text = "VerifyCode";
            this.TabVerifyCode.UseVisualStyleBackColor = true;
            // 
            // TabPageSetArg
            // 
            this.TabPageSetArg.Controls.Add(this.TxtBox_Proxy);
            this.TabPageSetArg.Controls.Add(this.label_Proxy);
            this.TabPageSetArg.Location = new System.Drawing.Point(4, 22);
            this.TabPageSetArg.Name = "TabPageSetArg";
            this.TabPageSetArg.Padding = new System.Windows.Forms.Padding(3);
            this.TabPageSetArg.Size = new System.Drawing.Size(617, 333);
            this.TabPageSetArg.TabIndex = 1;
            this.TabPageSetArg.Text = "Setting";
            this.TabPageSetArg.UseVisualStyleBackColor = true;
            // 
            // TxtBox_Proxy
            // 
            this.TxtBox_Proxy.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.TxtBox_Proxy.Location = new System.Drawing.Point(6, 29);
            this.TxtBox_Proxy.Name = "TxtBox_Proxy";
            this.TxtBox_Proxy.Size = new System.Drawing.Size(197, 21);
            this.TxtBox_Proxy.TabIndex = 1;
            // 
            // label_Proxy
            // 
            this.label_Proxy.AutoSize = true;
            this.label_Proxy.Location = new System.Drawing.Point(6, 14);
            this.label_Proxy.Name = "label_Proxy";
            this.label_Proxy.Size = new System.Drawing.Size(35, 12);
            this.label_Proxy.TabIndex = 0;
            this.label_Proxy.Text = "Proxy";
            // 
            // StatusStripA
            // 
            this.StatusStripA.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.StatusLabel_Form,
            this.ScriptProgressBar});
            this.StatusStripA.Location = new System.Drawing.Point(0, 363);
            this.StatusStripA.Name = "StatusStripA";
            this.StatusStripA.Size = new System.Drawing.Size(626, 22);
            this.StatusStripA.TabIndex = 6;
            this.StatusStripA.Text = "StatusStripA";
            // 
            // StatusLabel_Form
            // 
            this.StatusLabel_Form.ForeColor = System.Drawing.SystemColors.ControlText;
            this.StatusLabel_Form.Name = "StatusLabel_Form";
            this.StatusLabel_Form.Size = new System.Drawing.Size(93, 17);
            this.StatusLabel_Form.Text = "wait commend";
            // 
            // ScriptProgressBar
            // 
            this.ScriptProgressBar.Name = "ScriptProgressBar";
            this.ScriptProgressBar.Size = new System.Drawing.Size(100, 16);
            this.ScriptProgressBar.Step = 1;
            // 
            // SaveXmlDialog
            // 
            this.SaveXmlDialog.DefaultExt = "xml";
            this.SaveXmlDialog.Filter = "xml文件|*.xml";
            // 
            // GameControl
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(626, 385);
            this.Controls.Add(this.StatusStripA);
            this.Controls.Add(this.TabControlA);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.KeyPreview = true;
            this.MaximizeBox = false;
            this.Name = "GameControl";
            this.Text = "GameControl";
            this.KeyPress += new System.Windows.Forms.KeyPressEventHandler(GameControl_KeyPress);
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.GameControl_FormClosing);
            this.TabControlA.ResumeLayout(false);
            this.TabPageRegister.ResumeLayout(false);
            this.TabPageRegister.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.PicBox_VerifyCode)).EndInit();
            this.TabPageSetArg.ResumeLayout(false);
            this.TabPageSetArg.PerformLayout();
            this.StatusStripA.ResumeLayout(false);
            this.StatusStripA.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TabControl TabControlA;
        private System.Windows.Forms.TabPage TabVerifyCode;
        private System.Windows.Forms.TabPage TabPageSetArg;
        private System.Windows.Forms.StatusStrip StatusStripA;
        private System.Windows.Forms.ToolStripStatusLabel StatusLabel_Form;
        private System.Windows.Forms.ToolStripProgressBar ScriptProgressBar;
        private System.Windows.Forms.TextBox TxtBox_Proxy;
        private System.Windows.Forms.Label label_Proxy;
        private System.Windows.Forms.SaveFileDialog SaveXmlDialog;
        private System.Windows.Forms.TabPage TabPageRegister;
        private System.Windows.Forms.Label label_ChooseXml;
        private System.Windows.Forms.Button But_SubmitReg;
        private System.Windows.Forms.TextBox TxtBox_VerifyCode;
        private System.Windows.Forms.Label label_VerifyCode;
        private System.Windows.Forms.PictureBox PicBox_VerifyCode;
        private System.Windows.Forms.Label label_VerifyCodePic;
        private System.Windows.Forms.Button But_ProxyNext;
        private System.Windows.Forms.Button But_StartReg;
        private System.Windows.Forms.ComboBox CboBox_XmlFile;
        private System.Windows.Forms.TextBox TxtBox_HttpResponse;
        private System.Windows.Forms.Label label_Response;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.ListBox ListBox_VerifyResult;
    }
}

