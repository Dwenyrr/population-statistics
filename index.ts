import express from 'express';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const app : express.Application = express();
const prisma = new PrismaClient();

const portti : number = Number(process.env.PORT) || 3101;

app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, 'public')));

// GET polku hakee hakusanaa vastaavat kunnat ja renderöi ne index.ejs sivulle
app.get("/hae", async (req : express.Request, res : express.Response) => {

    const sarake : string = req.query.jarjestettava?.toString() || 'kunta';
    const jarjestys : string = req.query.jarjestys === 'desc' ? 'desc' : 'asc';
    console.log('Sorting column:', sarake);
    console.log('Sorting order:', jarjestys);
    try {
        if (req.query.hakusana !== undefined) {
            res.render('index', { kunnat : await prisma.kunta.findMany({
                where : {
                    kunta : {
                        startsWith : req.query.hakusana.toString() || ''
                    }
                },
                orderBy : {
                    [sarake] : jarjestys
                },
            }), 
                hakusana : req.query.hakusana.toString() || '', 
                jarjestettava : sarake, 
                jarjestys : jarjestys
            });
            
        } else {
            res.render('index', { kunnat : await prisma.kunta.findMany({
                orderBy : {
                    [sarake] : jarjestys
                }
            })});
        }      
    } catch (err : any) {
        console.log("Virhe tapahtui datan haussa:", err);
    }
});

// GET polku hakee kaikki kunnat ja renderöi ne index.ejs sivulle
app.get("/", async (req: express.Request, res: express.Response) => {
    try {
        res.render("index", { kunnat : await prisma.kunta.findMany({
            orderBy : {
                kunta : "asc"
            }
        }),
            hakusana: "", 
            jarjestettava: "kunta",
            jarjestys: "asc",
        });
    } catch (err : any) {
        console.log("Virhe tapahtui datan haussa:", err);
    }
});

app.listen(portti, () => {
    console.log(`Palvelin käynnistyi osoitteeseen : http://localhost:${portti}`);
});

