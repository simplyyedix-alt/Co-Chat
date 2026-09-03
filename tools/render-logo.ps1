Add-Type -AssemblyName System.Drawing
$size = 1024
$bmp = New-Object System.Drawing.Bitmap($size, $size)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.Clear([System.Drawing.Color]::White)
$rect = New-Object System.Drawing.Rectangle(24, 24, 976, 976)
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddArc(24, 24, 976, 976, 0, 360)
$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, [System.Drawing.Color]::FromArgb(99,82,214), [System.Drawing.Color]::FromArgb(179,111,234), 45)
$g.FillPath($brush, $path)
$pen = New-Object System.Drawing.Pen([System.Drawing.Color]::White, 104)
$pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$cRect = New-Object System.Drawing.Rectangle(285, 285, 454, 454)
$g.DrawArc($pen, $cRect, 45, 270)
$dotBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$g.FillEllipse($dotBrush, 682, 338, 104, 104)
$g.FillEllipse($dotBrush, 682, 582, 104, 104)
$out = 'D:\github\Co-Chat\website\assets\co-chat-pfp.png'
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
Write-Output $out
