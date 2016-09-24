Friend Class Form1

    Private Sub Form1_Load(sender As Object, e As System.EventArgs) Handles Me.Load

        Label1.Text = "My Test"
        ParseCommandLineArgs()
        Me.Show()


    End Sub

    Private Sub ParseCommandLineArgs()
        Dim inputName As String = ""

        For Each s As String In My.Application.CommandLineArgs

            inputName = inputName + s + " "

        Next
        If inputName <> "" Then

            'MsgBox("Input name: " & inputName)
            Label1.Text = inputName
        Else
            'MsgBox("No arguments")
        End If

        Me.Show()
    End Sub

End Class
