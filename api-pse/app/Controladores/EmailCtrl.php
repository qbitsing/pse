<?php 

namespace Pse\Controladores;
use Pse\Modelos\Usuarios as users;

class EmailCtrl extends Controlador
{
	public function enviarEmail($email,$nombre,$password,$codigo,$usuario){
		$user=users::find($usuario);
		$nombre_empresa=$user->Empresa->nombre;
		$cabeceras = 'MIME-Version: 1.0' . "\r\n";
		$cabeceras .= "Content-type: text/html; charset=ISO-8859-1 \r\n";
		$cabeceras .= "From:Prines@soporte.com \r\n";
		$mensaje= '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
			<meta name="viewport" content="width=device-width" />
			<title>'.$nombre_empresa.'</title>
			<style>
				* { 
					margin:0;
					padding:0;
				}
				* { font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif; }

				img { 
					max-width: 100%; 
				}
				.collapse {
					margin:0;
					padding:0;
				}
				body {
					-webkit-font-smoothing:antialiased; 
					-webkit-text-size-adjust:none; 
					width: 100%!important; 
					height: 100%;
				}
				a { color: #2BA6CB;}

				.btn {
					text-decoration:none;
					color: #FFF;
					background-color: #666;
					padding:10px 16px;
					font-weight:bold;
					margin-right:10px;
					text-align:center;
					cursor:pointer;
					display: inline-block;
				}

				p.callout {
					padding:15px;
					background-color:#ECF8FF;
					margin-bottom: 15px;
				}
				.callout a {
					font-weight:bold;
					color: #2BA6CB;
				}

				table.social {
				 	padding:15px; 
					background-color: #ebebeb;
					
				}
				.social .soc-btn {
					padding: 3px 7px;
					font-size:12px;
					margin-bottom:10px;
					text-decoration:none;
					color: #FFF;font-weight:bold;
					display:block;
					text-align:center;
				}
				a.fb { background-color: #3B5998!important; }
				a.tw { background-color: #1daced!important; }
				a.gp { background-color: #DB4A39!important; }
				a.ms { background-color: #000!important; }

				.sidebar .soc-btn { 
					display:block;
					width:100%;
				}

				table.head-wrap { width: 100%;}

				.header.container table td.logo { padding: 15px; }
				.header.container table td.label { padding: 15px; padding-left:0px;}

				table.body-wrap { width: 100%;}

				table.footer-wrap { width: 100%;	clear:both!important;
				}
				.footer-wrap .container td.content  p { border-top: 1px solid rgb(215,215,215); padding-top:15px;}
				.footer-wrap .container td.content p {
					font-size:10px;
					font-weight: bold;
					
				}

				h1,h2,h3,h4,h5,h6 {
				font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; line-height: 1.1; margin-bottom:15px; color:#000;
				}
				h1 small, h2 small, h3 small, h4 small, h5 small, h6 small { font-size: 60%; color: #6f6f6f; line-height: 0; text-transform: none; }

				h1 { font-weight:200; font-size: 44px;}
				h2 { font-weight:200; font-size: 37px;}
				h3 { font-weight:500; font-size: 27px;}
				h4 { font-weight:500; font-size: 23px;}
				h5 { font-weight:900; font-size: 17px;}
				h6 { font-weight:900; font-size: 14px; text-transform: uppercase; color:#444;}

				.collapse { margin:0 !important;}
				.tablaa{
					width:100%;
				}

				p, ul { 
					margin-bottom: 10px; 
					font-weight: normal; 
					font-size:14px; 
					line-height:1.6;
				}
				p.lead { font-size:17px; text-align="justify"; }
				p.last { margin-bottom:0px;}

				ul li {
					margin-left:5px;
					list-style-position: inside;
				}

				ul.sidebar {
					background:#ebebeb;
					display:block;
					list-style-type: none;
				}
				ul.sidebar li { display: block; margin:0;}
				ul.sidebar li a {
					text-decoration:none;
					color: #666;
					padding:10px 16px;
					margin-right:10px;
					cursor:pointer;
					border-bottom: 1px solid #777777;
					border-top: 1px solid #FFFFFF;
					display:block;
					margin:0;
				}
				ul.sidebar li a.last { border-bottom-width:0px;}
				ul.sidebar li a h1,ul.sidebar li a h2,ul.sidebar li a h3,ul.sidebar li a h4,ul.sidebar li a h5,ul.sidebar li a h6,ul.sidebar li a p { margin-bottom:0!important;}
				.container {
					display:block!important;
					max-width:600px!important;
					margin:0 auto!important;
					clear:both!important;
				}
				.content {
					padding:15px;
					max-width:600px;
					margin:0 auto;
					display:block; 
				}
				.contenedorcodigo{border:solid 1px; width:auto; padding:2em;}
				.codigo{
					margin:0;
				}

				.column {
					width: 300px;
					float:left;
				}
				.column tr td { padding: 15px; }
				.column-wrap { 
					padding:0!important; 
					margin:0 auto; 
					max-width:600px!important;
				}
				.column table { width:100%;}
				.social .column {
					width: 280px;
					min-width: 279px;
					float:left;
				}
				.clear { display: block; clear: both; }

				@media only screen and (max-width: 600px) {
					
					a[class="btn"] { display:block!important; margin-bottom:10px!important; background-image:none!important; margin-right:0!important;}

					div[class="column"] { width: auto!important; float:none!important;}
					
					table.social div[class="column"] {
						width:auto!important;
					}

				}
			</style>
		</head>
		 
		<body bgcolor="#FFFFFF">
		<table class="head-wrap" bgcolor="#999999">
			<tr>
				<td></td>
				<td class="header container" >
						<div class="content">
						<table bgcolor="#999999" class="tablaa">
							<tr >
								<td><img src="http://www.dinastiainternacional.com/correo/image.jpg" height="60"/></td>
								<td align="right"><h6 class="collapse">'.$nombre_empresa.'</h6></td>
							</tr>
						</table>
						</div>
						
				</td>
				<td></td>
			</tr>
		</table>
		<table class="body-wrap">
			<tr>
				<td></td>
				<td class="container" bgcolor="#FFFFFF">
					<div class="content">
					<table>
						<tr>
							<td text-align="center">
								<h2 text-align="justify">Hi, '.$nombre.'</h2>
								<p class="lead">';
								if(is_null($codigo)){
									$mensaje.='Usted ha sido registrado en nuestro sistema, Para iniciar sesión sus datos serán los siguientes:<br>Correo electronico:'.$email.'.<br>Contraseña:
														</p>
														<div class="contenedorcodigo" align="center"><h3 class="codigo">'.$password.'</h3></div>';
									$asunto="Datos de acceso al sistema";
								}else{
									$mensaje.='su petici&oacute;n de restablecimiento de contrase&ntilde;a ha sido atendida, para continuar por favor digite el siguiente c&oacute;digo de verificaci&oacute;n en la aplicaci&oacute;n:
														</p>
														<div class="contenedorcodigo" align="center"><h3 class="codigo">'.$codigo.'</h3></div>';
									$asunto="Recuperación de contraseña";
								}
								$mensaje.='
								<p class="callout" align="center">
									Este correo ha sido auto-generado por el sistema
								</p>
							</td>
						</tr>
					</table>
					</div>
											
				</td>
				<td></td>
			</tr>
		</table>
		</body>
		</html>';
		return mail($email,$asunto,$mensaje,$cabeceras);
	}
}