export async function searchStudent(e,setSearchUser, setFoundUser, saveStudent, registration) {
    e.preventDefault();
        
        try {
            setSearchUser(true)
            const token = localStorage.getItem('clerk_authToken');     
            const response = await fetch(`http://localhost:3030/student/search/${registration}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                const data = await response.json();
                setFoundUser(true);
                saveStudent(data.responseStudent);
            } else {
                setFoundUser(false);
            }
        } catch (error) {
            alert("ERRO! Não conseguimos conectar ao servidor para encontrar o aluno");
        }
} 